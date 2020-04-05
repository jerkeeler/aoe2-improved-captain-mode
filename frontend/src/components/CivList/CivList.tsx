import React from 'react';
import { Civ } from '@icm/shared/types';

import CivIcon from '../CivIcon';
import styles from './CivList.module.css';

interface Props {
  civs: Civ[];
  onCivClick: (civ: Civ) => void;
}

const CivList = ({ civs, onCivClick }: Props) => {
  return (
    <ul className={styles.civList}>
      {civs.map((c) => (
        <CivIcon key={c.name} civ={c} onClick={onCivClick} />
      ))}
    </ul>
  );
};

export default CivList;
