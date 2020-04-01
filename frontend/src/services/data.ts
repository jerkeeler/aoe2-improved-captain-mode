import axios from 'axios';

import { Civ, Map, Draft } from '../types';

export async function getCivilizations(): Promise<Civ[]> {
  const response = await axios.get('/api/civilizations');
  return response.data.civilizations;
}

export async function getMaps(): Promise<Map[]> {
  const response = await axios.get('/api/maps');
  return response.data.maps;
}

export async function getNames(): Promise<string[]> {
  const response = await axios.get('/api//names');
  return response.data.names;
}

export async function getPresets(): Promise<Draft[]> {
  const response = await axios.get('/api/drafts/presets');
  return response.data.presets;
}
