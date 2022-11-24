const Autor = require("../models/Autores");


exports.GetAutor = (req, res, next) => {

    Autor.findAll()
        .then((result) => {
            const Autor = result.map((result) => result.dataValues);

            res.render("autores/autores-lists", {
                pageTitle: "Autores",
                autorActive: true,
                autor: Autor,
                hasAutor: Autor.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

exports.GetSaveAutor = (req, res, next) => {

    res.render("autores/save-autor", {

        pageTitle: "Administra autores",

    });


};


exports.PostSaveAutor = (req, res, next) => {

    const nombre = req.body.Nombre;
    const correo = req.body.Correo;

    Autor.create({
        nombre: nombre,
        correo: correo,

    }).then((result) => {

        return res.redirect("/autor");

    }).catch((error) => {


        console.log(error);

    });

};

exports.PostDeleteAutors = (req, res, next) => {

    const autorId = req.body.autorId;

    Autor.destroy({ where: { id: autorId } })
        .then((result) => {
            return res.redirect("/autor");
        })
        .catch((err) => {
            console.log(err);
        });
};



exports.GetEditAutor = (req, res, next) => {
    const edit = req.query.edit;
    const autorId = req.params.autorId;

    if (!edit) {
        return res.redirect("/autor");
    }

    Autor.findOne({ where: { id: autorId } })
        .then((result) => {
            const autor = result.dataValues;

            if (!autor) {
                return res.redirect("/autor");
            }
            res.render("autores/save-autor", {
                pageTitle: "Editar autores",
                autorActive: true,
                editMode: edit,
                autor: autor,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.PostEditAutor = (req, res, next) => {

    const autorId = req.body.autorId;
    const nombre = req.body.Nombre;
    const correo = req.body.Correo;

    Autor.update({ nombre: nombre, correo: correo }, { where: { id: autorId } })
        .then((result) => {
            return res.redirect("/autor");
        })
        .catch((err) => {
            console.log(err);
        });
};