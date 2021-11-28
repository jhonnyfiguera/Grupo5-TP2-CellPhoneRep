require('dotenv').config();
const users = require('../data/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Valida la estructura de los datos recibidos para crear el usuario
 * @param {user} user
 * @returns boolean
 */
async function validateUser(user) {
	let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
	return re.test(user.email) && user.password.length > 2;
}

/**
 * Llama a la función addUser y getUserByEmail de data/users
 * @param {User} user
 * @returns user
 */
async function addUser(user) {
	const userBd = await users.getUserByEmail(user.email);

	if (userBd) {
		throw new Error('El email se encuentra registrado, por favor, inicia sección.');
	}

	if (!user.email || !user.password) {
		throw new Error('Es requerido email y password.');
	}

	if (!(await validateUser(user))) {
		throw new Error('Algunos de los datos son incorrectos.');
	}

	user.password = await bcrypt.hash(user.password, 8);
	user.activeAccount = true;
	!user.phone ? (user.phone = '') : user.phone;
	!user.fullName ? (user.fullName = '') : user.fullName;

	return users.addUser(user);
}

/**
 * Llama a la función getUserId de data/users
 * @param {id} id
 * @returns user
 */
async function getUserById(id) {
	const user = await users.getUserById(id);
	if (!user) {
		throw new Error('Usuario no encontrado.');
	}
	return user;
}

/**
 * Llama al getUserById de controller y al updateUser de data/users
 * @param {user} user
 * @returns user
 */
 async function updateUser(user) {
	const userBd = await getUserById(user._id);
	if (!user.fullName && !user.phone) {
		throw new Error('No se pudieron actualizar los datos - vacios');
	}

	if (user.fullName && user.fullName.length < 4) {
		throw new Error('No se pudieron actualizar los datos - name incorrecto');
	}

	if (user.fullName && userBd.fullName !== user.fullName) {
		userBd.fullName = user.fullName;
	}

	if (user.phone && user.phone.length < 8) {
		throw new Error('No se pudieron actualizar los datos - tel incorrecto');
	}

	if (user.phone && userBd.phone !== user.phone) {
		userBd.phone = user.phone;
	}

	return users.updateUser(userBd);
}

/**
 * Actualización de cuenta de usuario
 * @param {id} id 
 * @returns Resultado de activar cuenta de usuario
 */
async function activateUserAccount(id) {
  const userDb = await getUserById(id);
  
  if (userDb.activeAccount) {
		throw new Error('La cuenta ya se encuentra activa.');
	}
  
	userDb.activeAccount = true;
	return users.updateAccountUser(userDb);
}

/**
 * Actualización de cuenta de usuario
 * @param {id} id 
 * @returns Resultado de desactivar cuenta de usuario
 */
 async function deactivateUserAccount(id) {
  const userDb = await getUserById(id);

  if (!userDb.activeAccount) {
		throw new Error('La cuenta ya se encuentra inactiva.');
	}

	userDb.activeAccount = false;
	return users.updateAccountUser(userDb);
}

/**
 * Validación de credencial de acceso
 * @param {string} mail
 * @param {string} pass
 * @returns user
 */
 async function findByCredential(mail, pass) {
	const user = await users.getUserByEmail(mail);
	if (!user) {
		throw new Error('Email invalido o cuenta se encuentra inactiva.');
	}
	const isMatch = await bcrypt.compare(pass, user.password);
	if (!isMatch) {
		throw new Error('Contraseña incorrecta.');
	}
	return user;
}

/**
 * Generación de Token
 * @param {user} user
 * @returns Token activo por 2hrs
 */
async function generateAuthToken(user) {
	const token = jwt.sign({ _id: user._id }, process.env.SECRET, {expiresIn: '2h'});
	return token;
}

/**
 * ------------------------------------------
 * Llama a la función getAllUsers de data/user
 * @returns All Users
 */
async function getAllUsers() {
	return users.getAllUsers();
}

module.exports = {
	addUser,
	getUserById,
	updateUser,
  activateUserAccount,
  deactivateUserAccount,
	findByCredential,
	generateAuthToken,
	getAllUsers,
};
