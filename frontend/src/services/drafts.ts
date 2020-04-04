import axios from 'axios';
import { Draft, Role } from '@icm/shared/types';

export async function createDraft(draft: Draft): Promise<string> {
  const response = await axios.post('/api/drafts', draft);
  return response.data.draftToken;
}

interface DraftInfoResponse {
  draftConfig: Draft;
  availableRoles: Role[];
}

export async function getDraftInfo(token: string): Promise<DraftInfoResponse> {
  const response = await axios.get(`/api/drafts/${token}`);
  return response.data;
}
