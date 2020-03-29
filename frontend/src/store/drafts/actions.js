import * as draftsService from '../../services/drafts';

export const DRAFT_ACTIONS = {
  CLEAR_STATE: 'draft/clear-state',
  SET_PRESETS: 'drafts/set-presets',
  SET_ACTIVE_DRAFT_INFO: 'drafts/set-active-draft-info',
};

export const clearActiveDraft = () => ({ type: DRAFT_ACTIONS.CLEAR_STATE });

const setPresets = (presetDrafts) => ({
  type: DRAFT_ACTIONS.SET_PRESETS,
  presetDrafts,
});

const setActiveDraftInfo = (token, draftConfig, role) => ({
  type: DRAFT_ACTIONS.SET_ACTIVE_DRAFT_INFO,
  token,
  draftConfig,
  role,
});

export const getDraftPresets = () => async (dispatch) => {
  const presetDrafts = await draftsService.getPresets();
  dispatch(setPresets(presetDrafts));
};

export const getDraftConfig = (token, role) => async (dispatch) => {
  const draftConfig = await draftsService.getDraftConfig(token);
  dispatch(setActiveDraftInfo(token, draftConfig, role));
};
