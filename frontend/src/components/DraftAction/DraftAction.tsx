import React from 'react';
import { Action } from '@icm/shared/types';

import { getActionName } from '../../copy';
import ActionPill from '../ActionPill';
import styles from './DraftAction.module.css';

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
