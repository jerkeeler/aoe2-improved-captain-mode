import React from 'react';

import styles from './CivIcon.module.css';

const CivIcon = ({ civ, onClick }) => (
  <li className={styles.civIcon} onClick={() => onClick(civ)}>
    <img className={styles.civImage} src={`/static/img/units/${civ.uniqueUnit}.jpg`} alt={civ.uniqueUnit} />
    <p className={styles.civName}>
      {civ.name}
    </p>
  </li>
);

export default CivIcon;
