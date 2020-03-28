import axios from 'axios';

import { joinRoom } from '../sockets';
import { loadDraft, ActiveDraft } from '../models';

export async function getPresets() {
  const response = await axios.get('/api/drafts/presets');
  return response.data.map(loadDraft);
}

export async function createDraft(draft) {
  const response = await axios.post('/api/drafts', draft);
  const activeDraft = new ActiveDraft(response.data.draftToken, draft);
  joinRoom(activeDraft.token);
}
