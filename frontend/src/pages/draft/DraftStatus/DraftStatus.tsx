import React from 'react';
import { Role } from '@icm/shared/types';

import useDraftState from '../../../hooks/useDraftState';
import CaptainStatus from '../CaptainStatus';
import SpectatorStatus from '../SpectatorStatus';

import styles from './DraftStatus.module.css';

const DraftStatus = () => {
  const { role } = useDraftState();
  if (role === Role.SPECTATOR)
    return (
      <div className={styles.status}>
        <SpectatorStatus />
      </div>
    );

  return (
    <div className={styles.status}>
      <CaptainStatus />
    </div>
  );
};

export default DraftStatus;
