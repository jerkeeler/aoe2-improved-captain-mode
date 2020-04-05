import React from 'react';
import { Civ } from '@icm/shared/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CivIcon.module.css';

interface Props {
  civ: Civ;
  onClick?: (civ: Civ) => void;
  banned?: boolean;
  picked?: boolean;
}

const Banned = () => (
  <span className={styles.banned}>
    <FontAwesomeIcon icon="ban" size="4x" />
  </span>
);

const Picked = () => (
  <span className={styles.picked}>
    <FontAwesomeIcon icon="check" size="4x" />
  </span>
);

const CivIcon = ({ civ, onClick, banned = false, picked = false }: Props) => (
  <li className={styles.civIcon} onClick={() => onClick && onClick(civ)}>
    <div className={styles.imageWrapper}>
      <img className={styles.civImage} src={`/static/img/units/${civ.uniqueUnit}.jpg`} alt={civ.uniqueUnit} />
      {banned && <Banned />}
      {picked && <Picked />}
    </div>
    <p className={styles.civName}>{civ.name}</p>
  </li>
);

export default CivIcon;
