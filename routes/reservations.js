const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservations');

router.get('/', async (req, res) => {
    console.log("check");
    res.json(await controller.getAllReservations());
});

module.exports = router;