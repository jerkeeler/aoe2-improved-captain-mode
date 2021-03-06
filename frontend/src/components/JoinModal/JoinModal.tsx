import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';

import Modal from '../Modal';
import styles from './JoinModal.module.css';

interface Props {
  handleClose: () => void;
  show: boolean;
}

const JoinModal = ({ handleClose, show }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const history = useHistory();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value);
  const onJoin = () => {
    if (!token) return;
    history.push(`/draft/${token}`);
  };

  return (
    <Modal handleClose={handleClose} show={show}>
      <p>Enter the token of the draft you would like to join:</p>
      <div className={styles.inputWrapper}>
        <input onChange={onChange} placeholder="aaa..." />
      </div>
      <div className={styles.buttons}>
        <button onClick={onJoin}>Join</button>
        <button onClick={handleClose} className="outline">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default JoinModal;
