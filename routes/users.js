const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/', async (req, res) => {
    console.log("check");
    res.json(await controller.getAllUsers());
});

module.exports = router;