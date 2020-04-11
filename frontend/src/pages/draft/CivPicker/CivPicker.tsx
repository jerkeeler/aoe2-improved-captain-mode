import React from 'react';
import {
  Action,
  Captains,
  ActionObject,
  ActionScope,
  ActionType,
  Civ,
  ClientDraftEvent,
  DraftState,
} from '@icm/shared/types';

import { getSocket } from '../../../socket';
import { CaptainDraftInfo } from '../../../store/types';
import useDraftState from '../../../hooks/useDraftState';
import useActiveCaptain from '../../../hooks/useActiveCaptain';
import useOtherCaptain from '../../../hooks/useOtherCaptain';
import CivList from '../../../components/CivList';
import { SocketEvent } from '@icm/shared/socketTypes';

const getNextAction = (captain: Captains, currentIdx: number, actions: Action[]): Action => {
  currentIdx = currentIdx < 0 ? 0 : currentIdx;
  let action = actions[currentIdx];
  let idx = currentIdx + 1;
  while (idx < actions.length && action.captain !== captain) {
    action = actions[idx];
    idx++;
  }
  return action;
};

const getGlobalBans = (choices: CaptainDraftInfo[]): number[] => {
  return choices
    .flatMap((choice) => choice.bans)
    .filter((b) => b.object === ActionObject.CIV && b.scope === ActionScope.GLOBAL)
    .map((b) => b.value);
};

const getGlobalPicks = (choices: CaptainDraftInfo[]): number[] => {
  return choices
    .flatMap((choice) => choice.picks)
    .filter((b) => b.object === ActionObject.CIV && b.scope === ActionScope.GLOBAL)
    .map((b) => b.value);
};

const getExclusiveBans = (choices: CaptainDraftInfo[], captain: Captains): number[] => {
  return choices
    .filter((choice) => choice.captain === captain)
    .flatMap((choice) => choice.bans)
    .filter((b) => b.object === ActionObject.CIV && b.scope === ActionScope.EXCLUSIVE)
    .map((b) => b.value);
};

const getExlusivePicks = (choices: CaptainDraftInfo[], captain: Captains): number[] => {
  return choices
    .filter((choice) => choice.captain === captain)
    .flatMap((choice) => choice.bans)
    .filter((b) => b.object === ActionObject.CIV && b.scope === ActionScope.EXCLUSIVE)
    .map((b) => b.value);
};

const CivPicker = () => {
  const {
    draftInfo: { currentActionIdx, state },
    draftConfig,
    captain1,
    captain2,
    activeAction,
  } = useDraftState();
  const captain = useActiveCaptain();
  const otherCaptain = useOtherCaptain();
  const captainDraftChoices = [captain1, captain2];
  // If it's not your turn, get the next valid action to compare against
  const action = getNextAction(captain.captain, currentActionIdx, draftConfig.actions);
  const picked: Set<number> = new Set(getGlobalPicks(captainDraftChoices));
  const banned: Set<number> = new Set([...getGlobalBans(captainDraftChoices), ...draftConfig.globalCivBans]);

  // If banning:
  //   - any globally banned or picked civs
  //   - Get any exclusive bans you have made
  if (action.type === ActionType.BAN) {
    getExclusiveBans(captainDraftChoices, captain.captain).forEach((b) => banned.add(b));
  }

  // If Picking
  //   - Get any globally banned or picked civs
  //   - Get any exclusive picks you have made
  //   - Get any exlusive bans made against you
  if (action.type === ActionType.PICK) {
    getExlusivePicks(captainDraftChoices, captain.captain).forEach((p) => picked.add(p));
    getExclusiveBans(captainDraftChoices, otherCaptain.captain).forEach((b) => banned.add(b));
  }

  const onClick = (civ: Civ) => {
    if (activeAction.captain !== captain.captain || state !== DraftState.IN_PROGRESS) return;
    const socket = getSocket();
    const draftEvent: ClientDraftEvent = {
      ...activeAction,
      value: civ.id,
    };
    socket.emit(SocketEvent.CLIENT_DRAFT_EVENT, draftEvent);
  };

  return <CivList onCivClick={onClick} picked={picked} banned={banned} />;
};

export default CivPicker;
