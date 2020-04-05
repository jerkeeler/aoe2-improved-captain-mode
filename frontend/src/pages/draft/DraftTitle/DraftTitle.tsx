import React from 'react';
import { Role } from '@icm/shared/types';

import useDraftState from '../../../hooks/useDraftState';
import styles from './DraftTitle.module.css';

const DraftTitle = () => {
  const draftState = useDraftState();
  let cap1Name = draftState.draftInfo.captain1.name || '...';
  let cap2Name = draftState.draftInfo.captain2.name || '...';

  if (draftState.role === Role.CAPTAIN_1) cap1Name += ' (you)';
  else if (draftState.role === Role.CAPTAIN_2) cap2Name += ' (you)';
  return (
    <h1>
      <span className={styles.cap1}>{cap1Name}</span> <span className={styles.vs}>vs</span>{' '}
      <span className={styles.cap2}>{cap2Name}</span>
    </h1>
  );
};

export default DraftTitle;
