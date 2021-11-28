const express = require("express");
const router = express.Router();
const controller = require("../controllers/repairs");
const auth = require("../middleware/authentication");

/*
 * Tipos de Reparaciones
 */
router.get("/", auth, async (req, res) => {
  try {
    console.log("Tipos de Reparaciones");
    res.json(await controller.getTypeOfRepairs());
  } catch (error) {
    res.status(401).send(error.message);
  }
});

/*
 * Un tipo de reparacion por id
 */
router.get("/:id", auth, async (req, res) => {
  try {
    console.log("Tipo de reparacion por id.");
    res.json(await controller.getTypeOfRepairById(req.params.id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
