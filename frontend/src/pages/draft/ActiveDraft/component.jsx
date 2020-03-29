import React from 'react';

import DraftMinimap from '../../../components/DraftMinimap';

const ActiveDraft = ({ activeDraftToken, activeDraftConfig, activeDraftStep }) => {
  if (!activeDraftToken)
    return null;
  return (
    <div>
      <h1>DRAFT IS ACTIVE!</h1>
      <DraftMinimap draftConfig={activeDraftConfig} activeIndex={activeDraftStep} />
    </div>
  );
};

export default ActiveDraft;
