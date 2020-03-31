import React from 'react';
import { useSelector } from 'react-redux';

import DraftMinimap from '../../../components/DraftMinimap';

const ActiveDraft = () => {
  const {
    activeDraftToken,
    activeDraftConfig,
    activeDraftStep,
    captainName,
    role,
  } = useSelector(({ draftsReducer: {
    activeDraftToken,
    activeDraftConfig,
    activeDraftStep,
    role,
  }, defaultReducer: {
    captainName,
  }}) => ({
    activeDraftToken,
    activeDraftConfig,
    activeDraftStep,
    captainName,
    role,
  }));

  if (!activeDraftToken)
    return null;
  return (
    <div>
      <h1>Draft: <strong>{activeDraftToken}</strong></h1>
      <p>You are a: <strong>{role}</strong></p>
      <DraftMinimap draftConfig={activeDraftConfig} activeIndex={activeDraftStep} />
    </div>
  );
};

export default ActiveDraft;
