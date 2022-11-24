const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Autores = sequelize.define("autor", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    nombre: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    correo: {

        type: Sequelize.STRING,
        allowNull: false,

    },



});

module.exports = Autores;