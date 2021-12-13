const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservations');
const auth = require('../middleware/authentication');

/*
 * ----------------------------------------------
 * Todas las reservas de un usuario
 */
router.get('/user/:userId', auth, async (req, res) => {
	try {
		console.log('Reservas por usuario');
		res.json(await controller.getAllReservationsUser(req.params.userId));
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * ----------------------------------------------
 * Una reserva por id de reserva
 */
router.get('/:id', auth, async (req, res) => {
	try {
		console.log('Reserva por id');
		res.json(await controller.getReservationId(req.params.id));
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * ----------------------------------------------
 * Alta de reserva
 */
router.post('/add', async (req, res) => {
	try {
		console.log('Alta de reserva. ');
		const result = await controller.addReservation(req.body);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * ----------------------------------------------
 * Cancelación de reserva
 */
router.put('/cancelReservation/', async (req, res) => {
	try {
		console.log('Cancelación de reserva.');
		const result = await controller.cancelReservation(req.body._id);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

/*
 * ----------------------------------------------
 * Delete de reserva
 */
router.put('/deleteReservation/', async (req, res) => {
	try {
		console.log('Delete de reserva.');
		const result = await controller.deleteReservation(req.body._id);
		res.send(result);
	} catch (error) {
		res.status(401).send(error.message);
	}
});

module.exports = router;
