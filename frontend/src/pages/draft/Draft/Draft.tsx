import React from 'react';
import { DraftState, Role } from '@icm/shared/types';

import useDraftSocket from '../../../hooks/useDraftSocket';
import useDraftState from '../../../hooks/useDraftState';
import DraftMinimap from '../../../components/DraftMinimap';
import CaptainPicks from '../CaptainPicks';
import DraftStatus from '../DraftStatus';
import DraftLink from '../DraftLink';
import styles from './Draft.module.css';

const Draft = () => {
  useDraftSocket();
  const { draftInfo, draftConfig } = useDraftState();
  const activeIdx = draftInfo.state === DraftState.FINISHED ? -1 : draftInfo.currentActionIdx;

  return (
    <main className={styles.main}>
      <DraftLink />
      <DraftMinimap draftConfig={draftConfig} activeIndex={activeIdx} />
      <DraftStatus />
      <div className={styles.captainInfo}>
        <CaptainPicks role={Role.CAPTAIN_1} />
        <CaptainPicks role={Role.CAPTAIN_2} />
      </div>
    </main>
  );
};

export default Draft;
