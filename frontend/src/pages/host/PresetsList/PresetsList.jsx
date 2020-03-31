import React from 'react';
import { useSelector } from 'react-redux';

import DraftPresetTile from '../PresetTile';
import styles from './PresetsList.module.css';

const DraftPresetsList = () => {
  const { presets } = useSelector(({ draftsReducer: { draftPresets } }) => ({ presets: draftPresets }));
  return (
    <div className={styles.draftGrid}>
      {presets.map(d => <DraftPresetTile preset={d} key={d.name} />)}
    </div>
  );
};

export default DraftPresetsList;
