const { ObjectId } = require('bson');
const connection = require("./connection");
const DATABASE = "grupo5-cellphone";
const REPAIRSDB = "repairs";

/**
 * Busqueda Tipos de Reparaciones
 * @returns typeOfRepairs
 */
 async function getTypeOfRepairs(){
    const connectiondb = await connection.getConnection();
    const typeOfRepairs = await connectiondb
                        .db(DATABASE)
                        .collection(REPAIRSDB)
                        .find()
                        .toArray();                  
    return typeOfRepairs;
}

/**
 * Consulta de tipo de reparacion por id
 * @param {id} id
 * @returns tipo de reparacion
 */
 async function getTypeOfRepairById(id) {
	const connectiondb = await connection.getConnection();
	const typeOfRepair = await connectiondb
		.db(DATABASE)
		.collection(REPAIRSDB)
		.findOne({ _id: new ObjectId(id) });
	return typeOfRepair;
}

module.exports = {getTypeOfRepairs, getTypeOfRepairById};