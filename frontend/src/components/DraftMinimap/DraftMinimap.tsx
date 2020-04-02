import React from 'react';

import DraftAction from '../DraftAction';
import styles from './DraftMinimap.module.css';
import { Draft } from '../../types';

interface Props {
  draftConfig: Draft;
  activeIndex?: number;
}

const DraftMinimap = ({ draftConfig, activeIndex = -1 }: Props) => {
  return (
    <ul className={styles.actionList}>
      {draftConfig.actions.map((a, idx) => (
        <DraftAction key={idx} action={a} isActive={idx === activeIndex} />
      ))}
    </ul>
  );
};

export default DraftMinimap;
