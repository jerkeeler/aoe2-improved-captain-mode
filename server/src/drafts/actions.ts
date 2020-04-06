import { Draft, DraftState, Role } from '@icm/shared/types';

import { IS_PROD } from '../consts';
import { SameTokenError } from '../xceptions';
import store, { dispatch } from './store';
import { createActiveDraft } from './factory';
import { randomToken } from '../random';
import * as actions from './draftSlice';

// ACTION CREATORS
export const safeClearState = (): void => {
  if (!IS_PROD) dispatch(actions.clearState());
};

export const createNewDraft = (draftConfig: Draft): string => {
  const { drafts } = store.getState();
  const token = randomToken();
  if (token in drafts) throw new SameTokenError(token);

  const draft = createActiveDraft(token, draftConfig);
  dispatch(actions.newDraft(draft));
  return token;
};

export const joinSpectator = (token: string): void => {
  dispatch(actions.joinSpectator({ token }));
};

export const joinCaptain = (draftToken: string, captainToken: string, name: string, role: Role): void => {
  dispatch(
    actions.joinCaptain({
      draftToken,
      captainToken,
      name,
      role,
    }),
  );
};

export const readyCaptain = (draftToken: string, captainToken: string): void => {
  dispatch(
    actions.readyCaptain({
      draftToken,
      captainToken,
    }),
  );
};

export const leaveSpectator = (draftToken: string): void => {
  dispatch(actions.leaveSpectator({ draftToken }));
};

export const leaveCaptain = (draftToken: string, role: Role): void => {
  dispatch(actions.leaveCaptain({ draftToken, role }));
};

export const setDraftState = (draftToken: string, draftState: DraftState): void => {
  dispatch(actions.setDraftState({ draftToken, draftState }));
};

export const incrementActionIdx = (draftToken: string): void => {
  dispatch(actions.incrementActionIdx({ draftToken }));
};
