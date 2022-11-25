const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",
    secure: false,
    port: 587,
    auth: {

        user: "soullinkon@gmail.com",
        pass: "qswcswlyehcwpqcn",


    },

    tls: {

        rejectUnauthorized: false

    }


});

module.exports = transporter;