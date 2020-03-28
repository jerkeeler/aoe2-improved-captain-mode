import React from 'react';

import Modal from '../../../components/Modal';
import styles from './styles.module.css';

const PresetModal = ({ show, handleClose, preset, createDraft }) => (
  <Modal handleClose={handleClose} show={show}>
    <p>Do you wish to start preset <strong>"{preset.name}"</strong> as a captain or a spectator?</p>
    <div className={styles.buttons}>
      <button onClick={() => createDraft(preset)}>Captain</button>
      <button className="outline">Spectator</button>
    </div>
  </Modal>
);

export default PresetModal
