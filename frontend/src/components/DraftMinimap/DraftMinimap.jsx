import React from 'react';

import DraftAction from '../DraftAction';
import styles from './DraftMinimap.module.css';

const DraftMinimap = ({ draftConfig, activeIndex = -1}) => {
  return (
    <ul className={styles.actionList}>
      {draftConfig.actions.map((a, idx) => <DraftAction key={idx} action={a} isActive={idx === activeIndex} />)}
    </ul>
  );
};

export default DraftMinimap;
