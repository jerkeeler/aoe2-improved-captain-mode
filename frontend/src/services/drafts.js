import axios from 'axios';

import { loadDraft, ActiveDraft } from '../models';

export async function getPresets() {
  const response = await axios.get('/api/drafts/presets');
  return response.data.presets.map(loadDraft);
}

export async function createDraft(draft) {
  const response = await axios.post('/api/drafts', draft);
  return response.data.draftToken;
}

export async function getDraft(token) {
  const response = await axios.get(`/api/drafts?token=${token}`);
  return new ActiveDraft(response.data);
}
