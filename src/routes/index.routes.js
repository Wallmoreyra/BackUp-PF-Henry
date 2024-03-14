const { Router } = require('express');
const router = Router();
const { renderIndex } = require('../controllers/index.controller')

router.get('/', renderIndex);

//router.get('/about', renderAbout);

module.exports = router;