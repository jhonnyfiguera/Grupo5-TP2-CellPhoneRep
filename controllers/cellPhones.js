const cellPhones = require('../data/cellPhones');

/**
 * Llama a la función getCellPhones de data
 * @returns all cellPhones
 */
 async function getCellPhones() {
    return cellPhones.getCellPhones();
  }

/**
 * Llama a la función getCellPhonesById de data
 * @param {id} id
 * @returns celular
 */
async function getCellPhonesById(id) {
	const cellPhone = await cellPhones.getCellPhonesById(id);
	if (!cellPhone) {
		throw new Error('Celular no encontrado.');
	}
	return cellPhone;
}

module.exports = {getCellPhones, getCellPhonesById};