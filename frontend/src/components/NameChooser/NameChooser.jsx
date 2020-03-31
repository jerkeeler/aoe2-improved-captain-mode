import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal';
import { randomEl } from '../../random';
import { setCaptainName } from '../../store/actions';
import styles from './NameChooser.module.css';

const NameChooser = ({ show, handleClose, hideCancel = false }) => {
  const dispatch = useDispatch();
  const {
    captainName,
    names,
  } = useSelector(({ defaultReducer: { captainName, names }}) => ({ captainName, names }));
  const [localCaptainName, setLocalCaptainName] = useState(captainName);

  const randomName = () => {
    let newName = randomEl(names);
    while (newName === localCaptainName) {
      newName = randomEl(names);
    }
    setLocalCaptainName(newName);
  };

  const onChange = (e) => setLocalCaptainName(e.target.value);

  const close = ()  => {
    setLocalCaptainName(captainName);
    handleClose(captainName);
  };

  const setName = () => {
    dispatch(setCaptainName(localCaptainName));
    handleClose(localCaptainName);
  };

  return (
    <Modal show={show} handleClose={close}>
      <p>What would you like your captain name to be?</p>
      <div className={styles.form}>
        <input value={localCaptainName} onChange={onChange} placeholder="Boulder" />
        <span className={styles.icon} onClick={randomName}>🔄</span>
      </div>
      <div className={styles.buttons}>
        <button onClick={setName}>Set Name</button>
        {!hideCancel && <button className="outline" onClick={close}><em>Cancel</em></button>}
      </div>
    </Modal>
  );
};
export default NameChooser;
