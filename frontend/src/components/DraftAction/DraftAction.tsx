import React from 'react';

import { getActionName } from '../../copy';
import ActionPill from '../ActionPill';
import styles from './DraftAction.module.css';
import { Action } from '../../types';

interface Props {
  action: Action;
  isActive: boolean;
}

const DraftAction = ({ action, isActive }: Props) => {
  return (
    <li className={`${styles.action}`}>
      <ActionPill captain={action.captain} isActive={isActive} />
      {getActionName(action)}
    </li>
  );
};

export default DraftAction;
