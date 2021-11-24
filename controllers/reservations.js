const { ObjectId } = require('bson');
const reservations = require('../data/reservations');
const users = require("../data/users");

/**
 * Llama a la función async function getReservationId de data/reservations
 * @param {id de reserva} id 
 * @returns reserva
 */
 async function getReservationId(id){    
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
async function getAllReservationsUser(userId){    
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
    const userBd = await users.getUserById(reservation.user._id);

    if (!userBd) {
      throw new Error(
        "El usuario no existe."
      );
    }
    
    if (!reservation.phone || !reservation.itemsRepairs || !reservation.office || !reservation.date) {
      throw new Error("Faltan datos generar reserva.");
    }

    !reservation.additionalComment ? (reservation.additionalComment = "") : reservation.additionalComment;
    reservation.state = 'Pendiente';

    reservation.user._id =  ObjectId(userBd._id);
    reservation.phone._id = ObjectId(reservation.phone._id);
    reservation.office._id = ObjectId(reservation.office._id);

    let { itemsRepairs } = reservation;
    reservation.itemsRepairs = itemsRepairs.map( item => ({... item, _id: ObjectId(item._id)}));

    const costReparation = itemsRepairs.reduce((total, item) =>
    {
      let { cost } = item;
      return total + cost
    }, 0);

    const costPhone = () => {
      let { cost } = reservation.phone; 
      return cost;
    }; 
    
    reservation.estimatedRepairCost = costPhone() + costReparation;
    console.log("Precio total " + reservation.estimatedRepairCost);
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

module.exports = {getReservationId, getAllReservationsUser, addReservation, cancelReservation};