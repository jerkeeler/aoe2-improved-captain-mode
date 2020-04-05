import React from 'react';
import { Action, ActionType } from '@icm/shared/types';

import { objectName, scopeName } from '../../copy';
import ActionPill from '../ActionPill';
import styles from './DraftAction.module.css';

interface Props {
  action: Action;
  isActive: boolean;
}

const RevealCopy = ({ action }: { action: Action }) => <>{objectName[action.object]}</>;

const ActionCopy = ({ action }: { action: Action }) => (
  <>
    <strong>{scopeName[action.scope]}</strong>
    {objectName[action.object]}
  </>
);

const DraftAction = ({ action, isActive }: Props) => {
  return (
    <li className={`${styles.action}`}>
      <ActionPill action={action} isActive={isActive} />
      {action.type === ActionType.REVEAL && <RevealCopy action={action} />}
      {action.type !== ActionType.REVEAL && <ActionCopy action={action} />}
    </li>
  );
};

export default DraftAction;
