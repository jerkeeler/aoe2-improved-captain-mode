import React from 'react';
import { ActionType, Role } from '@icm/shared/types';

import useDraftState from '../../../hooks/useDraftState';
import useCaptain from '../../../hooks/useCaptain';
import ChosenCivs from '../../../components/ChosenCivs';
import { roleToCaptain } from '../../../utils';
import styles from './CaptainPicks.module.css';

interface Props {
  role: Role;
}

const CaptainPicks = ({ role }: Props) => {
  const draftState = useDraftState();
  const captain = useCaptain(role);

  const captainEnum = roleToCaptain(role);
  const numPicks = draftState.draftConfig.actions.filter((a) => a.type === ActionType.PICK && a.captain === captainEnum)
    .length;
  const numBans = draftState.draftConfig.actions.filter((a) => a.type === ActionType.BAN && a.captain === captainEnum)
    .length;

  let name = captain.name || '...';
  if (draftState.role === role) name += ' (you)';
  const capNameClass = role === Role.CAPTAIN_1 ? styles.cap1 : styles.cap2;
  return (
    <div>
      <header>
        <h1 className={`${styles.capName} ${capNameClass}`}>{name}</h1>
        <h3 className={styles.sectionHeader}>Picks</h3>
        <ChosenCivs numChooseable={numPicks} civs={[]} choice="picked" />
        <h3 className={styles.sectionHeader}>Bans</h3>
        <ChosenCivs numChooseable={numBans} civs={[]} choice="banned" />
      </header>
    </div>
  );
};

export default CaptainPicks;
