const { Router } = require('express');
const router = Router();

const civilizations = require('../data/civilizations');
const maps = require('../data/maps');

router.get('/civilizations', (req, res, next) => res.json(civilizations));
router.get('/maps', (req, res, next) => res.json(maps));

module.exports = router;
