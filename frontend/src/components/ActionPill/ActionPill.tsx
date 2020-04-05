import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action, ActionType, Captains } from '@icm/shared/types';

import styles from './ActionPill.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  action: Action;
  isActive: boolean;
}

const getCapClass = (captain: number) => {
  switch (captain) {
    case Captains.CAP_1:
      return styles.captain1;
    case Captains.CAP_2:
      return styles.captain2;
    default:
      return styles.admin;
  }
};

const getFaIcon = (actionType: ActionType): IconProp => {
  switch (actionType) {
    case ActionType.PICK:
      return 'check';
    case ActionType.BAN:
      return 'ban';
    case ActionType.REVEAL:
      return 'eye';
  }
};

const ActionPill = ({ action, isActive }: Props) => {
  const capClass = getCapClass(action.captain);
  const activeClass = isActive ? styles.active : '';
  const faIcon = getFaIcon(action.type);
  return (
    <span className={`${styles.pill} ${activeClass}`} data-testid="actionPill">
      <FontAwesomeIcon icon={faIcon} className={capClass} size="2x" />
    </span>
  );
};

export default ActionPill;
