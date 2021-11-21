require("dotenv").config();
const users = require("../data/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Llama a la función getAllUsers de data/user
 * @returns all Users
 */
async function getAllUsers() {
  return users.getAllUsers();
}

/**
 *
 * @param {id} id
 * @returns user
 */
async function getUserId(id) {
  const user = await users.getUserId(id);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }
  return user;
}

/**
 * Valida la estructura del los datos recibidos para crear el usuario
 * @param {user} user
 * @returns boolean
 */
async function userValidate(user) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
  return (re.test(user.email) && user.password.length > 2);
}

/**
 * Llama a la función addUser de data/users
 * @param {User} user
 * @returns user
 */
async function addUser(user) {
  const userBd = await users.getUserByEmail(user.email);

  if (userBd) {
    throw new Error(
      "El email se encuentra registrado, por favor, inicia sección."
    );
  }

  if (!user.email || !user.password) {
    throw new Error("Es requerido email y password.");
  }

  if (!(await userValidate(user))) {
    throw new Error("Algunos de los datos son incorrectos.");
  }
  return users.addUser(user);
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
    throw new Error("Credenciales no validas.");
  }
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }
  return user;
}

/**
 * Generación de Token
 * @param {user} user
 * @returns token
 */
async function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "2h",
  });
  return token;
}

/**
 * Llama al getUserId de data y al updateUser de data
 * @param {user} user 
 * @returns user
 */
async function updateUser(user) {
  const userBd = await users.getUserId(user._id);
  if (!user.fullName && !user.phone) {
    throw new Error("No se pudieron actualizar los datos - vacios");
  }

  if (user.fullName && user.fullName.length < 4) {
    throw new Error("No se pudieron actualizar los datos - name incorrecto");
  }

  if (user.fullName && userBd.fullName !== user.fullName) {
    userBd.fullName = user.fullName;
  }

  if (user.phone && user.phone.length < 8) {
    throw new Error("No se pudieron actualizar los datos - tel incorrecto");
  }

  if (user.phone && userBd.phone !== user.phone) {
    userBd.phone = user.phone;
  }

  return users.updateUser(userBd);
}

module.exports = {
  getAllUsers,
  getUserId,
  addUser,
  findByCredential,
  generateAuthToken,
  updateUser,
};
