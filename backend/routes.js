const express = require('express');

const router = express.Router();
const UserRoutes = require('./Elements/routes/route.user')
const BusRoutes = require('./Elements/routes/route.bus');

router.use('/bus',BusRoutes);
router.use('/',UserRoutes);

module.exports = router;
