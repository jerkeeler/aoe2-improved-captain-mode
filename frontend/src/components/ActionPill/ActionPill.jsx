import React from 'react';

import { CAPTAINS } from '../../models';
import styles from './ActionPill.module.css';

const getCapClass = (captain) => {
  switch(captain) {
    case CAPTAINS.CAP_1:
      return styles.captain1;
    case CAPTAINS.CAP_2:
      return styles.captain2;
    default:
      return styles.admin;
  }
};

const ActionPill = ({ captain, isActive }) => {
  const capClass = getCapClass(captain);
  const activeClass = isActive ? styles.active : '';
  return <span className={`${styles.pill} ${capClass} ${activeClass}`} />;
};

export default ActionPill;
