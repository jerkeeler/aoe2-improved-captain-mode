import React from 'react';
import { useHistory } from 'react-router';

import Modal from '../../../components/Modal';

const DisconnectModal = ({ show, handleClose, reason }) => {
  const history = useHistory();
  return (
    <Modal show={show} handleClose={handleClose}>
      <p>You have been disconnected from the draft!</p>
      <p><strong>Reason: </strong>{reason}</p>
      <button onClick={() => history.push('/')}>To Mainpage</button>
    </Modal>
  );
};

export default DisconnectModal;
