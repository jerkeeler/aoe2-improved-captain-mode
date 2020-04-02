import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import openSocket from 'socket.io-client';

import { Role } from '../../types';
import { RootState } from '../../store';
import Layout from '../../components/Layout';

const Draft = () => {
  const { token } = useParams();
  const { name } = useSelector(({ data: { captainName } }: RootState) => ({
    name: captainName,
  }));

  useEffect(() => {
    const socket = openSocket();
    socket.emit('join', { token, name, role: Role.SPECTATOR });
    return () => {
      socket.disconnect();
    };
  }, [token, name]);

  return (
    <Layout>
      <h1>New Draft ({token})</h1>
      <p>
        You are a: <strong>{Role.SPECTATOR}</strong>
      </p>
      <p>Your name is: {name}</p>
    </Layout>
  );
};

export default Draft;
