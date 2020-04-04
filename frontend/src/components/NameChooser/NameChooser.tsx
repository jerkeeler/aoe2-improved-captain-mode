import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { randomEl } from '@icm/shared/random';

import Modal from '../Modal';
import { setCaptainName } from '../../store/dataSlice';
import styles from './NameChooser.module.css';

import { RootState } from '../../store';

interface Props {
  show: boolean;
  handleClose?: () => void;
  hideCancel?: boolean;
}

const NameChooser = ({ show, handleClose, hideCancel = false }: Props) => {
  const dispatch = useDispatch();
  const { captainName, names } = useSelector(({ data: { captainName, names } }: RootState) => ({ captainName, names }));
  const [localCaptainName, setLocalCaptainName] = useState(captainName);

  const randomName = () => {
    let newName = randomEl(names);
    while (newName === localCaptainName) {
      newName = randomEl(names);
    }
    setLocalCaptainName(newName);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setLocalCaptainName(e.target.value);

  const close = () => {
    setLocalCaptainName(captainName);
    handleClose && handleClose();
  };

  const setName = () => {
    dispatch(setCaptainName(localCaptainName));
    handleClose && handleClose();
  };

  return (
    <Modal show={show} handleClose={close}>
      <p>What would you like your captain name to be?</p>
      <div className={styles.form}>
        <input value={localCaptainName} onChange={onChange} placeholder="Boulder" />
        <span className={styles.icon} onClick={randomName}>
          🔄
        </span>
      </div>
      <div className={styles.buttons}>
        <button onClick={setName}>Set Name</button>
        {!hideCancel && (
          <button className="outline" onClick={close}>
            <em>Cancel</em>
          </button>
        )}
      </div>
    </Modal>
  );
};
export default NameChooser;
