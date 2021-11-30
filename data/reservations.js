const { ObjectId } = require('bson');
const connection = require('./connection');
const DATABASE = 'grupo5-cellphone';
const RESERVATIONSDB = 'reservations';

/**
 * Busqueda de reserva por id
 * @param {id} id
 * @returns reserva
 */
async function getReservationId(id){
    const connectiondb = await connection.getConnection();
    const reservation = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVATIONSDB)
                        .findOne({ _id: new ObjectId(id) });   
    return reservation;
}

/**
 * Busqueda de todas las reservas de un usuario
 * @param {_id} userId 
 * @returns reservas de un usuario
 */
 async function getAllReservationsUser(userId){
    const connectiondb = await connection.getConnection();
    const reservations = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVATIONSDB)
                        .find({ 'user._id': new ObjectId(userId) })
                        .toArray();    
    return reservations;
}

/**
 * Alta de reserva
 * @param {reservation} reservation
 * @returns resultado de Alta de reserva
 */
 async function addReservation(reservation) {
    const connectiondb = await connection.getConnection();
    const result = connectiondb
                .db(DATABASE)
                .collection(RESERVATIONSDB)
                .insertOne(reservation);
    return result;
  }
  
/**
 * Cancelar reserva
 * @param {reservation} reservation
 * @returns resultado de cancelar reserva
 */
 async function cancelReservation(reservation) {
  const connectiondb = await connection.getConnection();
  const result = connectiondb
              .db(DATABASE)
              .collection(RESERVATIONSDB)
              .updateOne({_id: reservation._id}, {
                $set: {
                  state: reservation.state
                }
              });
  return result;
}

/**
 * Delete reserva
 * @param {id} id
 * @returns resultado de eliminar reserva
 */
 async function deleteReservation(id) {
  const connectiondb = await connection.getConnection();
  const result = connectiondb
              .db(DATABASE)
              .collection(RESERVATIONSDB)
              .deleteOne({ _id: new ObjectId(id) });
  return result;
}

module.exports = {getReservationId, getAllReservationsUser, addReservation, cancelReservation, deleteReservation};