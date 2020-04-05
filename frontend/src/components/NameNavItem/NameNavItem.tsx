import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NameChooser from '../NameChooser';
import styles from './NameNavItem.module.css';
import { RootState } from '../../store';

const NameNavItem = () => {
  const [modal, setModal] = useState(false);
  const captainName = useSelector(({ data }: RootState) => data.captainName);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  return (
    <>
      <NameChooser show={modal} handleClose={hideModal} />
      <li className={styles.label} onClick={showModal}>
        <span className={styles.you}>You are: </span>
        {captainName} ✏️
      </li>
    </>
  );
};

export default NameNavItem;
