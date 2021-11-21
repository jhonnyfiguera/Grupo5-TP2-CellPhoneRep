const { ObjectId } = require("bson");
const connection = require("./connection");
const DATABASE = "grupo5-cellphone";
const USERSDB = "users";
const bcrypt = require("bcryptjs");

/**
 * Busca de la base todos los usuarios
 * @returns all Users
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

/**
 * Busqueda de usuario por id
 * @param {id} id
 * @returns user
 */
async function getUserId(id) {
  const connectiondb = await connection.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERSDB)
    .findOne({ _id: new ObjectId(id) });
  return user;
}

/**
 * Busca un usuario en la base por email
 * @param {string} mail
 * @returns user
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
 * Alta de usuario
 * @param {user} user
 * @returns Alta de usuario
 */
async function addUser(user) {
  const connectiondb = await connection.getConnection();
  user.password = await bcrypt.hash(user.password, 8);
  user.activeAccount = true;
  !user.phone ? (user.phone = "") : user.phone;
  !user.fullName ? (user.fullName = "") : user.fullName;
  const result = connectiondb.db(DATABASE).collection(USERSDB).insertOne(user);
  return result;
}

/**
 * Actualización de datos de usuario
 * @param {user} user 
 * @returns update de usuario
 */

async function updateUser(user) { 
  const connectiondb = await connection.getConnection();
  const result = connectiondb.db(DATABASE).collection(USERSDB).updateOne({_id: user._id}, {
    $set: {
      fullName: user.fullName,
      phone: user.phone
    }
  });
  return result;
}

module.exports = {
  getAllUsers,
  getUserId,
  addUser,
  getUserByEmail,
  updateUser,
};
