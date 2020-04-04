import { Draft } from '@icm/shared/types';

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
  readyCaptain as readyCaptainAction,
} from './draftSlice';

// ACTION CREATORS
export const safeClearState = (): void => {
  if (!IS_PROD) dispatch(clearState());
};

export const createNewDraft = (draftConfig: Draft): string => {
  const { drafts } = store.getState();
  const token = randomToken();
  if (token in drafts) throw new SameTokenError(token);

  const draft = createActiveDraft(token, draftConfig);
  dispatch(newDraft(draft));
  return token;
};

export const joinSpectator = (token: string): void => {
  dispatch(joinSpectatorAction({ token }));
};

export const joinCaptain = (draftToken: string, captainToken: string, name: string): void => {
  dispatch(
    joinCaptainAction({
      draftToken,
      captainToken,
      name,
    }),
  );
};

export const readyCaptain = (draftToken: string, captainToken: string): void => {
  dispatch(
    readyCaptainAction({
      draftToken,
      captainToken,
    }),
  );
};
