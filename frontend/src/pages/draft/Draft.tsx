import React from 'react';
import { useSelector } from 'react-redux';
// import openSocket from 'socket.io-client';
import { Role } from '@icm/shared/types';

import { RootState } from '../../store';
import Layout from '../../components/Layout';

const Draft = () => {
  const { name, draftToken } = useSelector(({ data: { captainName }, drafts: { activeDraftToken } }: RootState) => ({
    name: captainName,
    draftToken: activeDraftToken,
  }));

  // useEffect(() => {
  //   const socket = openSocket();
  //   socket.emit('join', { draftToken, name, role: Role.SPECTATOR });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [draftToken, name]);

  return (
    <Layout>
      <h1>New Draft ({draftToken})</h1>
      <p>
        You are a: <strong>{Role.SPECTATOR}</strong>
      </p>
      <p>Your name is: {name}</p>
    </Layout>
  );
};

export default Draft;
