const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../middleware/authentication');

/**
 * Alta de usuario
 */
router.post('/add', async (req, res) => {
	try {
		console.log('Alta de usuario.');
		const result = await controller.addUser(req.body);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * Un usuario por id
 */
router.get('/:id', auth, async (req, res) => {
	try {
		console.log('Usuario por id.');
		res.json(await controller.getUserById(req.params.id));
	} catch (error) {
		res.status(404).send(error.message);
	}
});

/**
 * Actualización de usuario
 */
 router.put('/update', async (req, res) => {
	try {
		console.log('Actualizar datos de usuario.');
		const result = await controller.updateUser(req.body);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/**
 * Activar cuenta de usuario // true
 */
 router.put('/activateAccount', async (req, res) => {
	try {
    console.log('Activar cuenta de usuario.');
		const result = await controller.activateUserAccount(req.body._id);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/**
 * Desactivar cuenta de usuario  //false
 */
 router.put('/deactivateAccount', async (req, res) => {
	try {
    console.log('Desactivar cuenta de usuario.');
		const result = await controller.deactivateUserAccount(req.body._id);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/**
 * Validación de credenciales
 */
 router.post('/login', async (req, res) => {
	try {
		console.log('Login de usuario.');
		const user = await controller.findByCredential(req.body.email, req.body.password);
		const token = await controller.generateAuthToken(user);
		res.send({ user, token });
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * ----------------------------------------------
 * Todos los usuarios
 */
router.get('/', auth, async (req, res) => {
	console.log('Todos los usuarios.');
	res.json(await controller.getAllUsers());
});

module.exports = router;
