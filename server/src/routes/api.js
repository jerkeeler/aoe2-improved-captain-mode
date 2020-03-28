const { Router } = require('express');
const { randomToken } = require('../random');
const logger = require('../logger');

const { inflatePresets, validateDraft, loadDraft } = require('../drafts/config');
const draftStore = require('../drafts/store');
const civilizations = require('../data/civilizations');
const maps = require('../data/maps');
const draftPresets = inflatePresets(require('../data/drafts').presets);
const names = require('../data/names');

const router = Router();


router.get('/civilizations', (req, res, next) => res.json(civilizations));
router.get('/maps', (req, res, next) => res.json(maps));
router.get('/names', (req, res, next) => res.json(names));
router.get('/drafts/presets', (req, res, next) => res.json(draftPresets));
router.post('/drafts', (req, res, next) => {
  validateDraft(req.body);
  const draftConfig = loadDraft(req.body);
  const newDraftToken = draftStore.newDraft(draftConfig);
  logger.info(`New draft created: ${newDraftToken}`);
  res.json({'draftToken': newDraftToken});
});

module.exports = router;
