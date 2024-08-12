const router = require('express').Router();
const healthCheckRouter = require('./healthcheck.routes.js');
const todoRouter = require('./todo.routes.js');

// healthCheck Route
router.use('/health-check', healthCheckRouter);
// Todo Route
router.use('/todos', todoRouter);

module.exports = router;
