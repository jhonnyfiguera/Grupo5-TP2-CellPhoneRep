const repairs = require('../data/repairs');

/**
 * Llama a la función getTypeOfRepairs de data/typeOfRepairs
 * @returns all repairs
 */
 async function getTypeOfRepairs() {
    return repairs.getTypeOfRepairs();
  }

/**
 * Llama a la función getTypeOfRepairById de data/typeOfRepairs
 * @param {id} id
 * @returns Tipo de reparacion
 */
async function getTypeOfRepairById(id) {
	const repair = await repairs.getTypeOfRepairById(id);
	if (!repair) {
		throw new Error('Tipo de Reparacion no encontrada.');
	}
	return repair;
}

module.exports = {getTypeOfRepairs, getTypeOfRepairById};