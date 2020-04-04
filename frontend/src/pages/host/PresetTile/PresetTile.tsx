import React, { useState } from 'react';
import { Draft } from '@icm/shared/types';

import PresetModal from '../PresetModal';
import styles from './PresetTile.module.css';

interface Props {
  preset: Draft;
}

const DraftPresetTile = ({ preset }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PresetModal show={showModal} handleClose={() => setShowModal(false)} preset={preset} />
      <div className={styles.tile} onClick={() => setShowModal(true)}>
        <h4>{preset.name}</h4>
      </div>
    </>
  );
};

export default DraftPresetTile;
