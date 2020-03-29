import axios from 'axios';

import { loadDraft } from '../models';

export async function getPresets() {
  const response = await axios.get('/api/drafts/presets');
  return response.data.presets.map(loadDraft);
}

export async function createDraft(draft) {
  const response = await axios.post('/api/drafts', draft);
  return response.data.draftToken;
}

export async function getDraftConfig(token) {
  const response = await axios.get(`/api/drafts/${token}`);
  return loadDraft(response.data);
}
