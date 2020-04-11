import React from 'react';
import { useSelector } from 'react-redux';
import { ActionObject, ActionType, Captains, Role } from '@icm/shared/types';

import useDraftState from '../../../hooks/useDraftState';
import useCaptain from '../../../hooks/useCaptain';
import ChosenCivs from '../ChosenCivs';
import { roleToCaptain } from '../../../utils';
import styles from './CaptainPicks.module.css';
import { RootState } from '../../../store';

interface Props {
  role: Role;
}

const CaptainPicks = ({ role }: Props) => {
  const { civsById } = useSelector(({ data: { civsById } }: RootState) => ({ civsById }));
  const draftState = useDraftState();
  const captain = useCaptain(role);
  const captainChoices = captain.captain === Captains.CAP_1 ? draftState.captain1 : draftState.captain2;

  const captainEnum = roleToCaptain(role);
  const numPicks = draftState.draftConfig.actions.filter((a) => a.type === ActionType.PICK && a.captain === captainEnum)
    .length;
  const numBans = draftState.draftConfig.actions.filter((a) => a.type === ActionType.BAN && a.captain === captainEnum)
    .length;
  const civPicks = captainChoices.picks
    .filter((choice) => choice.object === ActionObject.CIV)
    .map((choice) => civsById[choice.value]);
  const civBans = captainChoices.bans
    .filter((choice) => choice.object === ActionObject.CIV)
    .map((choice) => civsById[choice.value]);

  let name = captain.name || '...';
  if (draftState.role === role) name += ' (you)';
  const capNameClass = role === Role.CAPTAIN_1 ? styles.cap1 : styles.cap2;
  return (
    <div>
      <header>
        <h1 className={`${styles.capName} ${capNameClass}`}>{name}</h1>
        <h3 className={styles.sectionHeader}>Picks</h3>
        <ChosenCivs numChooseable={numPicks} civs={civPicks} choice="picked" />
        <h3 className={styles.sectionHeader}>Bans</h3>
        <ChosenCivs numChooseable={numBans} civs={civBans} choice="banned" />
      </header>
    </div>
  );
};

export default CaptainPicks;
