import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NameChooser from '../NameChooser';
import styles from './NameNavItem.module.css';

const NameNavItem = () => {
  const [modal, setModal] = useState(false);
  const captainName = useSelector(({ defaultReducer }) => defaultReducer.captainName);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  return (
    <>
      <NameChooser show={modal} handleClose={hideModal} />
      <li className={styles.label} onClick={showModal}>{ captainName } ✏️</li>
    </>
  );
};

export default NameNavItem;
