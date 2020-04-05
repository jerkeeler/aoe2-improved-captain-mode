import React from 'react';

import useDraftSocket from '../../hooks/useDraftSocket';
import useDraftState from '../../hooks/useDraftState';
import Layout from '../../components/Layout';
import DraftMinimap from '../../components/DraftMinimap';
import DraftTitle from './DraftTitle';
import ReadyButton from './ReadyButton';

const Draft = () => {
  useDraftSocket();
  const { draftInfo, draftConfig } = useDraftState();

  return (
    <Layout>
      <DraftTitle />
      <p>There are {draftInfo.numSpectators} spectators</p>
      <ReadyButton />
      <DraftMinimap draftConfig={draftConfig} activeIndex={draftInfo.currentActionIdx} />
    </Layout>
  );
};

export default Draft;
