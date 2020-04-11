import React from 'react';
import { useSelector } from 'react-redux';
import { Civ } from '@icm/shared/types';

import CivIcon from '../CivIcon';
import styles from './CivList.module.css';
import { RootState } from '../../store';

interface Props {
  onCivClick: (civ: Civ) => void;
  picked: Set<number>;
  banned: Set<number>;
}

const CivList = ({ onCivClick, picked, banned }: Props) => {
  const { civs } = useSelector(({ data: { civs } }: RootState) => ({ civs }));
  return (
    <ul className={styles.civList}>
      {civs.map((c) => (
        <CivIcon key={c.name} civ={c} onClick={onCivClick} picked={picked.has(c.id)} banned={banned.has(c.id)} />
      ))}
    </ul>
  );
};

export default CivList;
