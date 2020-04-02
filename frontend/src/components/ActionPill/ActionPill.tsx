import React from 'react';

import { Captains } from '../../types';
import styles from './ActionPill.module.css';

interface Props {
  captain: number;
  isActive: boolean;
}

const getCapClass = (captain: number) => {
  switch (captain) {
    case Captains.CAP_1:
      return styles.captain1;
    case Captains.CAP_2:
      return styles.captain2;
    default:
      return styles.admin;
  }
};

const ActionPill = ({ captain, isActive }: Props) => {
  const capClass = getCapClass(captain);
  const activeClass = isActive ? styles.active : '';
  return <span className={`${styles.pill} ${capClass} ${activeClass}`} />;
};

export default ActionPill;
