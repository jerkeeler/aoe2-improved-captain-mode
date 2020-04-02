import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Civ } from '../../types';
import CivIcon from '../CivIcon';
import styles from './CivList.module.css';

interface Props {
  onCivClick: (civ: Civ) => void;
}

const CivList = ({ onCivClick }: Props) => {
  const civs = useSelector(({ data }: RootState) => data.civs);
  return (
    <ul className={styles.civList}>
      {civs.map((c) => (
        <CivIcon key={c.name} civ={c} onClick={onCivClick} />
      ))}
    </ul>
  );
};

export default CivList;
