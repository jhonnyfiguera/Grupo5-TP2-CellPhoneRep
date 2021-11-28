const offices = require('../data/offices');

/**
 * Llama a la función getAllOffices de data/Offices
 * @returns All Offices
 */
async function getAllOffices() {
	return offices.getAllOffices();
}

/**
 * Llama a la función getOfficeById de data/Offices
 * @param {id} id
 * @returns office
 */
async function getOfficeById(id) {
	const office = await offices.getOfficeById(id);
	if (!office) {
		throw new Error('Sucursal no encontrada.');
	}
	return office;
}

module.exports = {
	getAllOffices,
	getOfficeById,
};
