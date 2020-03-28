import * as draftsService from '../../services/drafts';

export const DRAFT_ACTIONS = {
  SET_PRESETS: 'drafts/set-presets',
  SET_ACTIVE_DRAFT: 'drafts/set-active-draft',
};

const setPresets = (presetDrafts) => ({
  type: DRAFT_ACTIONS.SET_PRESETS,
  presetDrafts,
});

const setActiveDraft = (activeDraft) => ({
  type: DRAFT_ACTIONS.SET_ACTIVE_DRAFT,
  activeDraft,
});

export const getDraftPresets = () => async (dispatch) => {
  const presetDrafts = await draftsService.getPresets();
  dispatch(setPresets(presetDrafts));
};

export const getDraft = (token) => async (dispatch) => {
  const activeDraft = await draftsService.getDraft(token);
  dispatch(setActiveDraft(activeDraft));
};
