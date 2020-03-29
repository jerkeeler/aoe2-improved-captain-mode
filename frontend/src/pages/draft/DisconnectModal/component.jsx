import React from 'react';

import Modal from '../../../components/Modal';

const DisconnectModal = ({ show, handleClose, reason }) => (
  <Modal show={show} handleClose={handleClose}>
    <p>You have been disconnected from the draft!</p>
    <p><strong>Reason: </strong>{reason}</p>
    <button onClick={() => window.location.href = '/'}>To Mainpage</button>
  </Modal>
);

export default DisconnectModal;
