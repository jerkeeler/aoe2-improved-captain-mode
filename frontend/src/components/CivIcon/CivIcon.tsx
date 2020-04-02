import React from 'react';

import { Civ } from '../../types';
import styles from './CivIcon.module.css';

interface Props {
  civ: Civ;
  onClick: (civ: Civ) => void;
}

const CivIcon = ({ civ, onClick }: Props) => (
  <li className={styles.civIcon} onClick={() => onClick(civ)}>
    <img className={styles.civImage} src={`/static/img/units/${civ.uniqueUnit}.jpg`} alt={civ.uniqueUnit} />
    <p className={styles.civName}>{civ.name}</p>
  </li>
);

export default CivIcon;
