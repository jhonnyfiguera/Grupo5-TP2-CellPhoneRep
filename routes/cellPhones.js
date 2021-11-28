const express = require("express");
const router = express.Router();
const controller = require("../controllers/cellPhones");
const auth = require("../middleware/authentication");

/*
 * Celulares
 */
router.get("/", auth, async (req, res) => {
  try {
    console.log("Tipos de celulares");
    res.json(await controller.getCellPhones());
  } catch (error) {
    res.status(401).send(error.message);
  }
});

/*
 * Un celular por id
 */
router.get("/:id", auth, async (req, res) => {
  try {
    console.log("Celular por id.");
    res.json(await controller.getCellPhonesById(req.params.id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
