const phone = require('../data/cellPhones');

/**
 * Llama a la función getCellTypes de data/phone
 * @returns all cellTypes
 */
 async function getCellTypes() {
    return phone.getCellTypes;
  }


  /**
 * Llama a la función getCellTypeById de data/cellPhone
 * @param {id} id
 * @returns Tipo de reparacion
 */
async function getCellTypeById(id) {
	const phone = await phone.getCellTypeById(id);
	if (!phone) {
		throw new Error('Tipo de Celular no encontrado.');
	}
	return phone;
}


  module.exports = {getCellTypes, getCellTypeById};
