const { ObjectId } = require("bson");
const reservations = require("../data/reservations");
const users = require("../controllers/users");
const offices = require("../controllers/offices");
const cellPhones = require("../controllers/cellPhones");
const repairs = require("../controllers/repairs");

/**
 * Llama a la función async function getReservationId de data/reservations
 * @param {id de reserva} id
 * @returns reserva
 */
async function getReservationId(id) {
  const reservation = await reservations.getReservationId(id);
  if (!reservation) {
    throw new Error("Reserva no encontrada.");
  }
  return reservation;
}

/**
 * Llama a la función async function getAllReservations de data/reservations
 * @param {id de usuario} userId
 * @returns reservas de un usuario
 */
async function getAllReservationsUser(userId) {
  const reservation = await reservations.getAllReservationsUser(userId);

  if (!reservation || reservation.length < 1) {
    throw new Error("No se encontraron reservas para el usuario indicado.");
  }
  return reservation;
}

/**
 * Llama a la función addReservation de data/reservations
 * @param {reservation} reservation
 * @returns reservation
 */
async function addReservation(reservation) {
  if (
    !reservation.user ||
    !reservation.phone ||
    !reservation.office ||
    !reservation.itemsRepairs ||
    reservation.itemsRepairs.length === 0 ||
    !reservation.date
  ) {
    throw new Error("Faltan datos para generar reserva.");
  }

  const userDb = await users.getUserById(reservation.user._id);
  const officeDb = await offices.getOfficeById(reservation.office._id);
  const cellPhonesDb = await cellPhones.getCellPhonesById(
    reservation.phone._id
  );

  const itemsRepairsId = reservation.itemsRepairs.map((item) => ({
    _id: item._id,
  }));
  let cont = 0;
  while (itemsRepairsId.length > cont) {
    await repairs.getTypeOfRepairById(itemsRepairsId[cont]._id);
    cont++;
  }

  !reservation.additionalComment
    ? (reservation.additionalComment = "")
    : reservation.additionalComment;
  reservation.state = "Pendiente";
  reservation.user._id = userDb._id;
  reservation.phone._id = cellPhonesDb._id;
  reservation.office._id = officeDb._id;

  reservation.itemsRepairs = reservation.itemsRepairs.map((item) => ({
    ...item,
    _id: ObjectId(item._id),
  }));

  const costReparation = reservation.itemsRepairs.reduce((total, item) => {
    let { cost } = item;
    return total + cost;
  }, 0);
  reservation.estimatedRepairCost = cellPhonesDb.cost + costReparation;

  return reservations.addReservation(reservation);
}

/**
 * Llama al cancelReservation de data/reservations
 * @param {_id} id
 * @returns user
 */
async function cancelReservation(id) {
  const reservation = await getReservationId(id);

  if (reservation.state !== "Pendiente") {
    throw new Error("La reserva no se puede cancelar - estado incorrecto");
  }

  reservation.state = "Cancelada";

  return reservations.cancelReservation(reservation);
}

/**
 * Delete de reserva
 * @param {id} id 
 * @returns id de reversa a Eliminar
 */
async function deleteReservation(id) {
  const reservation = await getReservationId(id);

  if (reservation.state !== "Pendiente" || !reservation) {
    throw new Error("La reserva no se puede eliminar");
  }

  return reservations.deleteReservation(id);
}

module.exports = {
  getReservationId,
  getAllReservationsUser,
  addReservation,
  cancelReservation,
  deleteReservation,
};
