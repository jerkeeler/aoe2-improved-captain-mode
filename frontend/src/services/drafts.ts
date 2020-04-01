import axios from 'axios';

import { Draft } from '../types';

export async function createDraft(draft: Draft): Promise<string> {
  const response = await axios.post('/api/drafts', draft);
  return response.data.draftToken;
}

export async function getDraftConfig(token: string): Promise<Draft> {
  const response = await axios.get(`/api/drafts/${token}`);
  return response.data;
}
