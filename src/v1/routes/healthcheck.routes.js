const router = require('express').Router();

const healthCheck = require('../controllers/health/healthcheck.controller');

router.route('/').get(healthCheck);

module.exports = router;
