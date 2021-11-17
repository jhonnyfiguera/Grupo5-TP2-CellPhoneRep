const { ObjectId } = require('bson');
const connection = require('./connection');
const DATABASE = 'grupo5-cellphone';
const USERSDB = 'users';
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getAllUsers(){
    const connectiondb = await connection.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERSDB)
                        .find()
                        .toArray();    
    return users;
}

module.exports = {getAllUsers};