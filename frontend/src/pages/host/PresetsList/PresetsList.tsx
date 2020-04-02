import React from 'react';
import { useSelector } from 'react-redux';

import DraftPresetTile from '../PresetTile';
import styles from './PresetsList.module.css';
import { RootState } from '../../../store';

const DraftPresetsList = () => {
  const { presets } = useSelector(({ data: { presets } }: RootState) => ({ presets }));
  return (
    <div className={styles.draftGrid}>
      {presets.map((d) => (
        <DraftPresetTile preset={d} key={d.name} />
      ))}
    </div>
  );
};

export default DraftPresetsList;
