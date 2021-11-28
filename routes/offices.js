const express = require("express");
const router = express.Router();
const controller = require("../controllers/offices");
const auth = require("../middleware/authentication");

/*
 * Todos los sucursales
 */
router.get("/", auth, async (req, res) => {
  console.log("Todos las sucursales.");
  res.json(await controller.getAllOffices());
});

/*
 * Un usuario por id
 */
router.get("/:id", auth, async (req, res) => {
  try {
    console.log("Sucursal por id.");
    res.json(await controller.getOfficeById(req.params.id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
