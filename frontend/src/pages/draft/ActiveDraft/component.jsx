import React from 'react';

import DraftMinimap from '../../../components/DraftMinimap';

const ActiveDraft = ({
  activeDraftToken,
  activeDraftConfig,
  activeDraftStep,
  role,
}) => {
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
