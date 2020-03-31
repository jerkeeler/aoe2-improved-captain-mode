import React from 'react';
import { useSelector } from 'react-redux';

import CivIcon from '../CivIcon';
import styles from './CivList.module.css';

const CivList = ({ onCivClick }) => {
  const civs = useSelector(({ defaultReducer }) => defaultReducer.civs);
  return (
    <ul className={styles.civList}>
      {civs.map(c => <CivIcon key={c.name} civ={c} onClick={onCivClick} />)}
    </ul>
  );
};

export default CivList;

