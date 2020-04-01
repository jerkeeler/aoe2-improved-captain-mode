import {  Request, Response, NextFunction, Router  } from 'express';

import logger from '../logger';

import { inflatePresets, validateDraft } from '../drafts/config';
import { createNewDraft } from '../drafts/actions';
import { draftExists, getDraftConfig } from '../drafts/storeRo';

const civilizations = require('../../data/civilizations');
const maps = require('../../data/maps');
const presets = require('../../data/drafts');
const names = require('../../data/names');

const draftPresets = inflatePresets(presets.presets);

const router = Router();

router.get('/civilizations', (req: Request, res: Response, next: NextFunction) => {
  res.json(civilizations)
});
router.get('/maps', (req: Request, res: Response, next: NextFunction) => {
  res.json(maps)
});
router.get('/names', (req: Request, res: Response, next: NextFunction) => {
  res.json(names)
});
router.get('/drafts/presets', (req: Request, res: Response, next: NextFunction) => {
  res.json({ presets: draftPresets })
});
router.get('/drafts/:token', (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token;
  if (!token || !draftExists(token)) {
    res.sendStatus(404);
    return;
  }
  res.json(getDraftConfig(token));
});
router.post('/drafts', (req: Request, res: Response, next: NextFunction) => {
  validateDraft(req.body);
  const draftConfig = req.body;
  const newDraftToken = createNewDraft(draftConfig);
  logger.info(`New draft created: ${newDraftToken}`);
  res.json({'draftToken': newDraftToken});
});

export default router;
