const express = require('express');
const router = express.Router();

const BusRoutes = require('./Elements/routes/route.bus');

router.use('/bus',BusRoutes);

module.exports = router;