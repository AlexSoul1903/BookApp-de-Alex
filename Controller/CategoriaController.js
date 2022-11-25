const Categoria = require("../models/Categorias");
const Libros = require("../models/Libros");

exports.GetCategoria = (req, res, next) => {

    Categoria.findAll({ include: [{ model: Libros }] })
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);

            res.render("categorias/categoria-lists", {
                pageTitle: "Categoria",
                categoriaActive: true,
                categoria: categoria,
                hasCategoria: categoria.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });


};

exports.GetSaveCategoria = (req, res, next) => {

    res.render("categorias/save-categoria", {

        pageTitle: "Administra categorias",

    });


};


exports.PostSaveCategoria = (req, res, next) => {

    const categoria = req.body.Categoria;
    const descripcion = req.body.Descripcion;

    Categoria.create({
        nombre: categoria,
        descripcion: descripcion,

    }).then((result) => {

        return res.redirect("/categorias");

    }).catch((error) => {


        console.log(error);

    });

};

exports.PostDeleteCategoria = (req, res, next) => {

    const categoriaId = req.body.categoriaId;

    Categoria.destroy({ where: { id: categoriaId } })
        .then((result) => {
            return res.redirect("/categorias");
        })
        .catch((err) => {
            console.log(err);
        });
};



exports.GetEditCategoria = (req, res, next) => {
    const edit = req.query.edit;
    const categoriaId = req.params.categoriaId;

    if (!edit) {
        return res.redirect("/categorias");
    }

    Categoria.findOne({ where: { id: categoriaId } })
        .then((result) => {
            const categoria = result.dataValues;

            if (!categoria) {
                return res.redirect("/categorias");
            }
            res.render("categorias/save-categoria", {
                pageTitle: "Editar categorias",
                categoriaActive: true,
                editMode: edit,
                categoria: categoria,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.PostEditCategoria = (req, res, next) => {

    const categorialId = req.body.categoriaId;
    const categoria = req.body.Categoria;
    const descripcion = req.body.Descripcion;

    Categoria.update({ nombre: categoria, descripcion: descripcion }, { where: { id: categorialId } })
        .then((result) => {
            return res.redirect("/categorias");
        })
        .catch((err) => {
            console.log(err);
        });
};