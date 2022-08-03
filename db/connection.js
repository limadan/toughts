const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('toughts', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

try{
    sequelize.authenticate()
    console.log("Conexão com o banco realizada com sucesso!")
}catch(err){
    console.log("Não foi possível se conectar ao banco.")
    throw err
}
module.exports = sequelize