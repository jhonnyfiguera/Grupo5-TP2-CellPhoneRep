const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const auth = require("../middleware/authentication");

/*
 * Todos los usuarios
 */
router.get("/", auth, async (req, res) => {
  console.log("Todos los usuarios.");
  res.json(await controller.getAllUsers());
});

/*
 * Un usuario por id
 */
router.get("/:id", auth, async (req, res) => {
  try {
    console.log("Usuario por id.");
    res.json(await controller.getUserId(req.params.id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/**
 * Alta de usuario
 */
router.post("/add", async (req, res) => {
  try {
    console.log("Alta de usuario.");
    const result = await controller.addUser(req.body);
    res.send(result);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

/**
 * Validación de credenciales
 */
router.post("/login", async (req, res) => {
  try {
    console.log("Login de usuario.");
    const user = await controller.findByCredential(
      req.body.email,
      req.body.password
    );
    const token = await controller.generateAuthToken(user);

    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

/**
 * Actualización de usuario
 */
 router.put("/update", async (req, res) => {
  try {
    console.log("Update de usuario.");
    const result = await controller.updateUser(req.body);
    res.send(result);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
