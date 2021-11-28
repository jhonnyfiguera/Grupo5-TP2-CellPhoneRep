const { ObjectId } = require('bson');
const connection = require("./connection");
const DATABASE = "grupo5-cellphone";
const CELLPHONESDB = "cellPhones";

/**
 * Busqueda los celulares
 * @returns typeOfRepairs
 */
 async function getCellPhones(){
    const connectiondb = await connection.getConnection();
    const cellPhones = await connectiondb
                        .db(DATABASE)
                        .collection(CELLPHONESDB)
                        .find()
                        .toArray();               
    return cellPhones;
}

/**
 * Consulta de celular por id
 * @param {id} id
 * @returns celular
 */
 async function getCellPhonesById(id) {
	const connectiondb = await connection.getConnection();
	const cellphone = await connectiondb
		.db(DATABASE)
		.collection(CELLPHONESDB)
		.findOne({ _id: new ObjectId(id) });
	return cellphone;
}

module.exports = {getCellPhones, getCellPhonesById};