import supertest from 'supertest';

import { safeClearState, createNewDraft } from '../../src/drafts/actions';
import app from '../../src/app';
const validDraft = require('../fixtures').validDraft;

const request = supertest(app);

describe('api routes', () => {
  afterEach(()  => {
    safeClearState();
  });

  test('/civilizations', async () => {
    const res = await request.get('/api/civilizations');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('civilizations');
    expect(res.body.civilizations.length).toEqual(35);
  });

  test('/maps', async () => {
    const res = await request.get('/api/maps');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('maps');
    expect(res.body.maps.length).toBeGreaterThan(0);
  });

  test('/names', async () => {
    const res = await request.get('/api/names');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('names');
    expect(res.body.names.length).toBeGreaterThan(0);
  });

  test('/drafts/presets', async () => {
    const res = await request.get('/api/drafts/presets');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('presets');
    expect(res.body.presets.length).toBeGreaterThan(0);
  });

  test('/drafts no token', async () => {
    const res = await request.get('/api/drafts');
    expect(res.status).toEqual(404);
  });

  test('/drafts invalid token', async () => {
    const res = await request.get('/api/drafts?token=INVALID');
    expect(res.status).toEqual(404);
  });

  test('/drafts valid token', async () => {
    const token = createNewDraft(validDraft);
    const res = await request.get(`/api/drafts/${token}`);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
  });

  test('/drafts POST create new valid', async () => {
    const res = await request.post('/api/drafts').send({
      name: 'test',
      actions: [
        {
          scope: 'G',
          object: 'C',
          type: 'P',
          visibility: 'V',
          captain: 1,
        }
      ],
      globalCivBans: [],
      mapPool: [],
    });
    expect(res.status).toEqual(200);
    expect(res.body.draftToken).not.toBeNull()
  });

  test('/drafts POST invalid action', async () => {
    const res = await request.post('/api/drafts').send({
      name: 'test',
      actions: [
        {
          scope: 'INVALID',
          type: 'P',
          visibility: 'V',
          captain: 1,
        },
      ],
      globalCivBans: [],
      mapPool: [],
    });
    expect(res.status).toEqual(404);
  });
});
