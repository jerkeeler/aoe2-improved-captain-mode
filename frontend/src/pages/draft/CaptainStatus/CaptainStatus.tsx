import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useActiveCaptain from '../../../hooks/useActiveCaptain';
import ReadyButton from '../ReadyButton';
import useDraftState from '../../../hooks/useDraftState';
import Countdown from '../Countdown';

const CaptainStatus = () => {
  const {
    draftInfo: { captain1, captain2, currentActionIdx },
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
  return (
    <p>
      Captain copy.... <Countdown />
    </p>
  );
};

export default CaptainStatus;
