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

export const createDraft = (draft) => async (dispatch) => {
  const activeDraft = await draftsService.createDraft(draft);
  dispatch(setActiveDraft(activeDraft));
};
