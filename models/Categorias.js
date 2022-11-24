const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Categoria = sequelize.define("category", {

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

    descripcion: {

        type: Sequelize.STRING,
        allowNull: true,
    },



});

module.exports = Categoria;