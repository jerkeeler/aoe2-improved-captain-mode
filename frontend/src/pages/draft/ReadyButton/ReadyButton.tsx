import React, { useState } from 'react';
import { Role } from '@icm/shared/types';
import { SocketEvent } from '@icm/shared/socketTypes';

import { getSocket } from '../../../socket';
import useDraftState from '../../../hooks/useDraftState';
import useActiveCaptain from '../../../hooks/useActiveCaptain';

import styles from './ReadyButton.module.css';

const ReadyButton = () => {
  const [sentReady, setSentReady] = useState(false);
  const { role } = useDraftState();
  const captain = useActiveCaptain();
  if (role === Role.SPECTATOR || captain.ready) return null;

  const socket = getSocket();

  const onClick = () => {
    if (sentReady) return;
    setSentReady(true);
    socket.emit(SocketEvent.READY);
  };

  return (
    <div className={styles.ready}>
      <button onClick={onClick}>Ready</button>
    </div>
  );
};

export default ReadyButton;
