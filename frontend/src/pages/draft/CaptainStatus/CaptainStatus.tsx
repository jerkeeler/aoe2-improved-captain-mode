import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCaptainCopy } from '../../../copy';
import useActiveCaptain from '../../../hooks/useActiveCaptain';
import ReadyButton from '../ReadyButton';
import useDraftState from '../../../hooks/useDraftState';
import Countdown from '../Countdown';

const CaptainStatus = () => {
  const {
    draftInfo: { captain1, captain2, currentActionIdx },
    draftConfig: { actions },
  } = useDraftState();
  const captain = useActiveCaptain();

  if (!captain.ready) return <ReadyButton />;
  if (!captain1.ready || !captain2.ready)
    return (
      <p>
        Waiting on other captain to ready up... <FontAwesomeIcon icon="spinner" spin />
      </p>
    );

  if (currentActionIdx === -1)
    return (
      <p>
        Both captains are ready! The draft is about to start! <Countdown />
      </p>
    );

  const currentAction = actions[currentActionIdx];
  return (
    <p>
      {getCaptainCopy(currentAction, captain.captain)} <Countdown />
    </p>
  );
};

export default CaptainStatus;
