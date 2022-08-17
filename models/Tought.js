const {DataTypes} = require('sequelize');
const db = require("../db/connection");



const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

const User = require('./User');


Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;