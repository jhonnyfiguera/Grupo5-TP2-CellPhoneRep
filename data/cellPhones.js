const connection = require("./connection");
const DATABASE = "grupo5-cellphone";
const PHONEDB = "cellPhones";

/**
 * Busqueda Tipos de celular

 * @returns cellTypes
 */
 async function getCellTypes(){
    const connectiondb = await connection.getConnection();
    const cellTypes = await connectiondb
                        .db(DATABASE)
                        .collection(PHONEDB)
                        .find()
                        .toArray();
                          
    return cellTypes;
}

/**
 * Consulta de tipo de celular por id
 * @param {id} id
 * @returns tipo de celular
 */
 async function getCellTypeById(id) {
	const connectiondb = await connection.getConnection();
	const repair = await connectiondb
		.db(DATABASE)
		.collection(PHONEDB)
		.findOne({ _id: new ObjectId(id) });
	return repair;
}

module.exports = {getCellTypes, getCellTypeById};
