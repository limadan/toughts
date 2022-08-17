const db = require('../db/connection.js');
const {DataTypes} = require('sequelize');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },

    email: {
        type: DataTypes.STRING,
        require: true
    },

    password: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = User;