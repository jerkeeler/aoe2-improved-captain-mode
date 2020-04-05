import React from 'react';
import useDraftState from '../../../hooks/useDraftState';
import Countdown from '../Countdown';

const SpectatorStatus = () => {
  const {
    draftInfo: { captain1, captain2, currentActionIdx },
  } = useDraftState();
  if (!captain1.ready || !captain2.ready) return <p>Waiting for captains to ready up...</p>;
  if (currentActionIdx === -1)
    return (
      <p>
        Draft is about to start! <Countdown />
      </p>
    );
  return (
    <p>
      Spectator copy... <Countdown />
    </p>
  );
};

export default SpectatorStatus;
