const { ObjectId } = require('bson');
const connection = require('./connection');
const DATABASE = 'grupo5-cellphone';
const OFFICESDB = 'offices';

/**
 * Consulta de todas las sucursales
 * @returns All Offices
 */
async function getAllOffices() {
	const connectiondb = await connection.getConnection();
	const offices = await connectiondb
        .db(DATABASE)
        .collection(OFFICESDB)
        .find()
        .toArray();
	return offices;
}

/**
 * Consulta de Sucursal por id
 * @param {id} id
 * @returns Office
 */
 async function getOfficeById(id) {
	const connectiondb = await connection.getConnection();
	const office = await connectiondb
		.db(DATABASE)
		.collection(OFFICESDB)
		.findOne({ _id: new ObjectId(id) });
	return office;
}

module.exports = {
	getAllOffices,
    getOfficeById,
};
