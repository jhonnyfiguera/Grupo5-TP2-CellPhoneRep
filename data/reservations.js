const { ObjectId } = require('bson');
const connection = require('./connection');
const DATABASE = 'grupo5-cellphone';
const RESERVATIONSDB = 'reservations';
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getAllReservations(){
    const connectiondb = await connection.getConnection();
    const reservations = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVATIONSDB)
                        .find()
                        .toArray();    
    return reservations;
}

module.exports = {getAllReservations};