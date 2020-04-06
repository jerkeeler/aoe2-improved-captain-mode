import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import styles from './Countdown.module.css';

const Countdown = () => {
  const { countdown } = useSelector(({ drafts: { countdown } }: RootState) => ({
    countdown,
  }));

  if (countdown < 0) return null;

  return (
    <span className={styles.countdown}>
      <span className={styles.number}>{Math.round(countdown)}</span>...
    </span>
  );
};

export default Countdown;
