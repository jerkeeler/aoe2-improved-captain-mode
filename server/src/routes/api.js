const { Router } = require('express');
const router = Router();

const { inflatePresets, validateDraft } = require('../drafts');

const civilizations = require('../data/civilizations');
const maps = require('../data/maps');
const draftPresets = inflatePresets(require('../data/drafts').presets);

router.get('/civilizations', (req, res, next) => res.json(civilizations));
router.get('/maps', (req, res, next) => res.json(maps));
router.get('/drafts/presets', (req, res, next) => res.json(draftPresets));
router.post('/drafts/validate', (req, res, next) => {
  try {
    validateDraft(req.body);
    res.json({
      valid: true,
    });
  } catch (err) {
    res.json({
      valid: false,
      error: err.name,
    });
  }
});

module.exports = router;
