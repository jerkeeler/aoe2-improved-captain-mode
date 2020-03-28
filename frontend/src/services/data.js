import axios from 'axios';

export async function getCivilizations() {
  const response = await axios.get('/api/civilizations');
  return response.data.civilizations;
}

export async function getMaps() {
  const response = await axios.get('/api/maps');
  return response.data.maps;
}

export async function getNames() {
  const response = await axios.get('/api/names');
  return response.data.names;
}

