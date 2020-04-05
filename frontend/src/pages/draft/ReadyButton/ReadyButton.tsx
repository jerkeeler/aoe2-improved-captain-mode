import React, { useState } from 'react';
import { Role } from '@icm/shared/types';

import { getSocket } from '../../../socket';
import useDraftState from '../../../hooks/useDraftState';

import styles from './ReadyButton.module.css';
import { SocketEvent } from '@icm/shared/socketTypes';

const ReadyButton = () => {
  const [sentReady, setSentReady] = useState(false);
  const { role, draftInfo } = useDraftState();
  if (role === Role.SPECTATOR || (draftInfo.captain1.ready && draftInfo.captain2.ready)) return null;

  const socket = getSocket();
  const captain = role === Role.CAPTAIN_1 ? draftInfo.captain1 : draftInfo.captain2;

  const onClick = () => {
    if (sentReady) return;
    setSentReady(true);
    socket.emit(SocketEvent.READY);
  };
  const el = captain.ready ? (
    <p>You are ready! Waiting on other captain to ready up...</p>
  ) : (
    <button onClick={onClick}>Ready</button>
  );
  return <div className={styles.ready}>{el}</div>;
};

export default ReadyButton;
