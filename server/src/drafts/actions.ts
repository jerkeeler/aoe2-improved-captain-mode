import { IS_PROD } from '../consts';
import { SameTokenError } from '../xceptions';
import store, { dispatch } from './store';
import { createActiveDraft } from './factory';
import { randomToken } from '../random';
import {
  clearState,
  newDraft,
  joinSpectator as joinSpectatorAction,
  joinCaptain as joinCaptainAction,
} from './draftSlice';
import { Draft } from '../models';

// ACTION CREATORS
export const safeClearState = () => {
  if (!IS_PROD)
    dispatch(clearState());
};

export const createNewDraft = (draftConfig: Draft) => {
  const { drafts } = store.getState();
  const token = randomToken();
  if (token in drafts)
    throw new SameTokenError(token);

  console.log(1111111, token);
  const draft = createActiveDraft(token, draftConfig);
  console.log(2222222, draft);
  dispatch(newDraft(draft));
  return token;
};

export const joinSpectator = (token: string) => {
  dispatch(joinSpectatorAction({ token }));
};

export const joinCaptain = (token: string, captainToken: string, name: string) => {
  dispatch(joinCaptainAction({
    token,
    captainToken,
    name,
  }));
};

