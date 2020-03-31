import React from 'react';

import { getActionName } from '../../copy';
import ActionPill from '../ActionPill';
import styles from './DraftAction.module.css';

const DraftAction = ({ action, isActive }) => {
  return (
    <li className={`${styles.action}`}>
      <ActionPill captain={action.captain} isActive={isActive} />
      {getActionName(action)}
    </li>
  );
};

export default DraftAction;
