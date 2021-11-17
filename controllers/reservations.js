const reservations = require('../data/reservations');

async function getAllReservations(){    
    return reservations.getAllReservations();
}

module.exports = {getAllReservations};