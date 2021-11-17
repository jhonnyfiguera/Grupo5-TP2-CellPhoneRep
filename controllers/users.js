const users = require('../data/users');

async function getAllUsers(){    
    return users.getAllUsers();
}

module.exports = {getAllUsers};