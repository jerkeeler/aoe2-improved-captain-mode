import React from 'react';

import DraftPresetTile from '../PresetTile';
import styles from './styles.module.css';

const DraftPresetsList = ({ presets }) => (
  <div className={styles.draftGrid}>
    {presets.map(d => <DraftPresetTile preset={d} key={d.name} />)}
  </div>
);

export default DraftPresetsList;
