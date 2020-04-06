import React from 'react';
import { DraftState, Role } from '@icm/shared/types';

import useDraftState from '../../../hooks/useDraftState';
import CaptainStatus from '../CaptainStatus';
import SpectatorStatus from '../SpectatorStatus';

import styles from './DraftStatus.module.css';

const DraftStatus = () => {
  const {
    role,
    draftInfo: { state, captain1, captain2 },
  } = useDraftState();

  let el = <CaptainStatus />;
  if (role === Role.SPECTATOR) el = <SpectatorStatus />;
  if (state === DraftState.IN_PROGRESS && !captain1.ready && !captain2.ready)
    el = <p>Other captain disconnected! Draft aborted!</p>;
  if (state === DraftState.FINISHED) el = <p>Draft has finished! Thanks for using AoE2 Improved Captain's Mode!</p>;

  return <div className={styles.status}>{el}</div>;
};

export default DraftStatus;
