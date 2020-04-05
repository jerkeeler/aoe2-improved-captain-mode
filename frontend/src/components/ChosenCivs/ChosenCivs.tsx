import React from 'react';
import { Civ } from '@icm/shared/types';

import styles from './ChosenCivs.module.css';

interface Props {
  numChooseable: number;
  civs: Civ[];
  choice: 'banned' | 'picked';
}

const ChosenCiv = ({ civ, choice }: { civ: Civ; choice: 'banned' | 'picked' }) => (
  <li className={`${styles.choice} ${styles[choice]}`}>
    <img src={`/static/img/units/${civ.uniqueUnit}.jpg`} alt={civ.uniqueUnit} className={styles.image} /> {civ.name}
  </li>
);

const EmptyFrame = ({ choice }: { choice: 'banned' | 'picked' }) => (
  <li className={`${styles.choice} ${styles[choice]}`}>
    <div className={styles.emptyFrame} />
  </li>
);

const ChosenCivs = ({ civs, choice, numChooseable }: Props) => {
  const numEmptyFrames = numChooseable - civs.length;
  return (
    <ul className={`${styles.wrapper}`}>
      {civs.map((c) => (
        <ChosenCiv civ={c} choice={choice} key={c.name} />
      ))}
      {Array(numEmptyFrames)
        .fill(0)
        .map((_, idx) => (
          <EmptyFrame choice={choice} key={idx} />
        ))}
    </ul>
  );
};

export default ChosenCivs;
