const { ObjectId } = require('bson');
const connection = require('./connection');
const DATABASE = 'grupo5-cellphone';
const USERSDB = 'users';

/**
 * Alta de usuario
 * @param {user} user
 * @returns Resultado de alta de usuario
 */
 async function addUser(user) {
	const connectiondb = await connection.getConnection();
	const result = connectiondb
    .db(DATABASE)
    .collection(USERSDB)
    .insertOne(user);
	return result;
}

/**
 * Consulta de usuario por id
 * @param {id} id
 * @returns User
 */
 async function getUserById(id) {
	const connectiondb = await connection.getConnection();
	const user = await connectiondb
		.db(DATABASE)
		.collection(USERSDB)
		.findOne({ _id: new ObjectId(id) });
	return user;
}

/**
 * Consulta de usuario por email
 * @param {string} mail
 * @returns User
 */
 async function getUserByEmail(mail) {
	const connectiondb = await connection.getConnection();
	const user = await connectiondb
		.db(DATABASE)
		.collection(USERSDB)
		.findOne({ $and: [{ email: mail }, { activeAccount: true }] });
	return user;
}

/**
 * Actualización de datos de usuario
 * @param {user} user
 * @returns Resultado de actualizar datos de usuario
 */
 async function updateUser(user) {
	const connectiondb = await connection.getConnection();
	const result = connectiondb
		.db(DATABASE)
		.collection(USERSDB)
		.updateOne(
			{ _id: user._id },
			{
				$set: {
					fullName: user.fullName,
					phone: user.phone,
				},
			},
		);
	return result;
}

/**
 * Actualización de cuenta de usuario
 * @param {user} user
 * @returns Resultado de activar o desactivar cuenta de usuario
 */
async function updateAccountUser(user) {
	const connectiondb = await connection.getConnection();
	const result = connectiondb
		.db(DATABASE)
		.collection(USERSDB)
		.updateOne(
			{ _id: user._id },
			{
				$set: {
					activeAccount: user.activeAccount,
				},
			},
		);
	return result;
}

/**
 * ------------------------------
 * Consulta de todos los usuarios
 * @returns All Users
 */
async function getAllUsers() {
	const connectiondb = await connection.getConnection();
	const users = await connectiondb
    .db(DATABASE)
    .collection(USERSDB)
    .find()
    .toArray();
	return users;
}

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
  updateUser,
  updateAccountUser,
	getAllUsers,
};
