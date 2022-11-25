const Editorial = require("../models/Editorial");
const Libro = require("../models/Libros");


exports.GetEditorial = (req, res, next) => {


    Editorial.findAll({ include: [{ model: Libro }] })
        .then((result) => {
            const editorial = result.map((result) => result.dataValues);

            res.render("editorial/editorial-lists", {
                pageTitle: "Editorial",
                editorialActive: true,
                editorial: editorial,
                hasEditorial: editorial.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });


};

exports.GetSaveEditorial = (req, res, next) => {

    res.render("editorial/save-editorial", {

        pageTitle: "Administra editoriales",

    });


};

exports.PostSaveEditorial = (req, res, next) => {

    const nombre = req.body.Nombre;
    const telefono = req.body.Telefono;
    const pais = req.body.Pais;

    Editorial.create({
        nombre: nombre,
        telefono: telefono,
        pais: pais,
    }).then((result) => {

        return res.redirect("/editorial");

    }).catch((error) => {


        console.log(error);

    });

};

exports.PostDeleteEditorial = (req, res, next) => {

    const editorialId = req.body.editorialId;

    Editorial.destroy({ where: { id: editorialId } })
        .then((result) => {
            return res.redirect("/editorial");
        })
        .catch((err) => {
            console.log(err);
        });
};



exports.GetEditReditorial = (req, res, next) => {
    const edit = req.query.edit;
    const editorialId = req.params.editorialId;

    if (!edit) {
        return res.redirect("/editorial");
    }

    Editorial.findOne({ where: { id: editorialId } })
        .then((result) => {
            const editorial = result.dataValues;

            if (!editorial) {
                return res.redirect("/editorial");
            }
            res.render("editorial/save-editorial", {
                pageTitle: "Editar editorial",
                editorialActive: true,
                editMode: edit,
                editorial: editorial,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.PostEditEditorial = (req, res, next) => {

    const editorialId = req.body.editorialId;
    const nombre = req.body.Nombre;
    const telefono = req.body.Telefono;
    const pais = req.body.Pais;

    Editorial.update({ nombre: nombre, telefono: telefono, pais: pais }, { where: { id: editorialId } })
        .then((result) => {
            return res.redirect("/editorial");
        })
        .catch((err) => {
            console.log(err);
        });
};