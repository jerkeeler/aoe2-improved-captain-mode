import React from 'react';

import Modal from '../../../components/Modal';

const PresetModal = ({ show, handleClose, preset }) => (
  <Modal handleClose={handleClose} show={show}>
    <header>
      <p>Do you wish to start preset <strong>"{preset.name}"</strong> as a captain or a spectator?</p>
      <a><strong>Captain</strong></a>
      <a><em>Spectator</em></a>
    </header>
  </Modal>
);

export default PresetModal
