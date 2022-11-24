const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Editorial = sequelize.define("editorial", {

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
    telefono: {

        type: Sequelize.STRING,
        allowNull: false,
    },
    pais: {

        type: Sequelize.STRING,
        allowNull: false,
    },


});

module.exports = Editorial;