const express = require("express");
const router = express.Router();
const controller = require("../controllers/cellPhones");
const auth = require('../middleware/authentication');

/*
 * Tipos de celular
 */
router.get("/", auth, async (req, res) => {
    try {
      console.log("Tipos de Celular");
      res.json(await controller.getCellTypes());
    } catch (error) {
      res.status(401).send(error.message);
    }
  });


  /*
 * Un tipo de celular por id
 */
router.get('/:id', auth, async (req, res) => {
	try {
		console.log('Tipo de celular por id.');
		res.json(await controller.getCellTypeById(req.params.id));
	} catch (error) {
		res.status(404).send(error.message);
	}
});

  module.exports = router;