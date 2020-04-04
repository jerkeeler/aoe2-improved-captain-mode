import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import { Role } from '@icm/shared/types';
import { JoinRoomMessage } from '@icm/shared/socketTypes';

import { RootState } from '../../store';
import Layout from '../../components/Layout';

const Draft = () => {
  const { name, draftToken, role } = useSelector(
    ({ data: { captainName }, drafts: { activeDraftToken, role } }: RootState) => ({
      name: captainName as string,
      draftToken: activeDraftToken as string,
      role: role as Role,
    }),
  );

  useEffect(() => {
    const socket = openSocket();
    const message: JoinRoomMessage = {
      draftToken,
      name,
      role,
    };
    socket.emit('join', message);
    return () => {
      socket.disconnect();
    };
  }, [draftToken, name, role]);

  return (
    <Layout>
      <h1>New Draft ({draftToken})</h1>
      <p>
        You are a: <strong>{role}</strong>
      </p>
      {role === Role.CAPTAIN && <p>Your name is: {name}</p>}
    </Layout>
  );
};

export default Draft;
