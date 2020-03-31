import React from 'react';

import { ROLES } from '../../../models';
import Modal from '../../../components/Modal';
import styles from './JoinDraftModal.module.css';

const JoinDraftModal = ({ handleClose, show, draftToken }) => {
  const specClose = () => handleClose(ROLES.SPECTATOR);
  const capClose = () => handleClose(ROLES.CAPTAIN);
  return (
    <Modal handleClose={specClose} show={show} >
      <p>How would you like to join this draft? (draft: {draftToken})</p>
      <div className={styles.buttons}>
        <button onClick={capClose}>Captain</button>
        <button onClick={specClose} className="outline">Spectator</button>
      </div>
    </Modal>
  );
};

export default JoinDraftModal;
