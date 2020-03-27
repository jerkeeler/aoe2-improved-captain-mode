import axios from 'axios';
import { loadDraft } from '../models';

export async function getPresets() {
  const response = await axios.get('/api/drafts/presets');
  const presetDrafts = response.data.map(loadDraft);
  return presetDrafts;
}

export async function validateDraft(draft) {
  const response = await axios.post('/api/drafts/validate', draft);
  return response.data;
}
