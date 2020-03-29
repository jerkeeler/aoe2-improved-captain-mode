import React from 'react';

import { captainName, getActionName } from '../../copy';
import ActionPill from '../ActionPill';
import styles from './styles.module.css';

const DraftAction = ({ action, isActive }) => {
  return (
    <li className={`${styles.action}`}>
      <ActionPill captain={action.captain} isActive={isActive} />
      {getActionName(action)}
    </li>
  );
};

export default DraftAction;
