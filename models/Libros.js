const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Libros = sequelize.define(

    "Libro", {

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

        imagen: {

            type: Sequelize.STRING,
            allowNull: true,
        },

        relase_date: {

            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    });




module.exports = Libros;