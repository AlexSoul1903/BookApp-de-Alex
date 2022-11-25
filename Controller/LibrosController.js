const Libro = require("../models/Libros");
const Categoria = require("../models/Categorias");
const Editorial = require("../models/Editorial");
const Autores = require("../models/Autores");
const transporter = require("../services/EmailService");
const { Op } = require("sequelize");


exports.GetIndex = (req, res, next) => {
    Autores.findAll()
        .then((result) => {
            const autor = result.map((result) => result.dataValues);
            Categoria.findAll().then((result) => {
                const categoria = result.map((result) => result.dataValues);
                Editorial.findAll().then((result) => {
                    const editorial = result.map((result) => result.dataValues);
                    Libro.findAll({ include: [{ model: Categoria }, { model: Editorial }, { model: Autores }] })
                        .then((result) => {
                            const libro = result.map((result) => result.dataValues);
                            res.render("libros/index", {
                                pageTitle: "Home",
                                homeActive: true,
                                libro: libro,
                                hasLibros: libro.length > 0,
                                autor: autor,
                                editorial: editorial,
                                categoria: categoria,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });
        });
};


exports.GetAdminLibro = (req, res, next) => {

    Libro.findAll({ include: [{ model: Categoria }, { model: Editorial }, { model: Autores }] })
        .then((result) => {
            const libro = result.map((result) => result.dataValues);
            res.render("libros/admin-libro", {
                pageTitle: "Administra libros",
                libro: libro,
                hasLibros: libro.length > 0

            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.GetSaveLibro = (req, res, next) => {

    Editorial.findAll()
        .then((result) => {
            const editorial = result.map((result) => result.dataValues);
            Categoria.findAll()
                .then((result) => {
                    const categoria = result.map((result) => result.dataValues);
                    Autores.findAll()
                        .then((result) => {
                            const autores = result.map((result) => result.dataValues);
                            res.render("libros/save-libro", {
                                pageTitle: "Crear Libro",
                                homeActive: false,
                                editMode: false,
                                categoria: categoria,
                                hasCategoria: categoria.length > 0,
                                editorial: editorial,
                                hasEditorial: editorial.length > 0,
                                autor: autores,
                                hasAutores: autores.length > 0,
                            });

                        })

                })
                .catch((err) => {
                    console.log(err);

                }).catch((err) => {
                    console.log(err);
                });
        });

}

exports.PostSaveLibro = (req, res, next) => {
    const libroName = req.body.Name;
    const relaseDate = req.body.Date;
    const libroCategoria = req.body.Categoria;
    const libroEditorial = req.body.Editorial;
    const libroAutor = req.body.Autor;
    const libroImage = req.file;


    Autores.findOne({ where: [{ id: libroAutor }] })
        .then((result) => {
            const correo = result.dataValues.correo;
            console.log(correo);

            Libro.create({
                    nombre: libroName,
                    categoryId: libroCategoria,
                    editorialId: libroEditorial,
                    autorId: libroAutor,
                    imagen: "/" + libroImage.path,
                    relase_date: relaseDate
                })
                .then((result) => {
                    res.redirect("/admin-libro");
                    return transporter.sendMail({
                        from: "Books notifications",
                        to: correo,
                        subject: `Se acaba de publicar un libro con su auditoria con el nombre de ${libroName}`,
                        html: "Se ha publicado un libro suyo exitosamente",

                    }, (err) => {

                        console.log(err);


                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        });
};

exports.PostDeleteLibro = (req, res, next) => {
    const libroId = req.body.libroId;

    Libro.destroy({ where: { id: libroId } })
        .then((result) => {
            return res.redirect("/admin-libro");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.GetEditLibro = (req, res, next) => {
    const edit = req.query.edit;
    const libroId = req.params.libroId;

    if (!edit) {
        return res.redirect("/admin-libro");
    }

    Libro.findOne({ where: { id: libroId } })
        .then((result) => {
            const libro = result.dataValues;

            if (!libro) {
                return res.redirect("/");
            }


            Categoria.findAll()
                .then((result) => {
                    const categoria = result.map((result) => result.dataValues);
                    Autores.findAll()
                        .then((result) => {
                            const autores = result.map((result) => result.dataValues);
                            Editorial.findAll()
                                .then((result) => {
                                    const editorial = result.map((result) => result.dataValues);

                                    res.render("libros/save-libro", {
                                        pageTitle: "Editar libro",
                                        libroActive: true,
                                        editMode: edit,
                                        libro: libro,
                                        categoria: categoria,
                                        editorial: editorial,
                                        autor: autores,
                                        hasCategoria: categoria.length > 0,
                                        hasAutores: autores.length > 0,
                                        hasEditorial: editorial.length > 0
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                        });
                });
        });
};

exports.PostEditLibro = (req, res, next) => {
    const libroN = req.body.Name;
    const image = req.file;
    const date = req.body.Date;
    const categoria = req.body.Type;
    const editorial = req.body.Editorial;
    const autor = req.body.Autor;
    const libroId = req.body.libroId;

    console.log(image);

    Libro.findOne({ where: { id: libroId } })
        .then((result) => {

            const libro = result.dataValues;

            if (!libro) {
                return res.redirect("/");
            }


            if (image == undefined) {
                let imagePath = "";


                Libro.update({ nombre: libroN, imagen: imagePath, relase_date: date, categoryId: categoria, editorialId: editorial, autorId: autor }, { where: { id: libroId } })
                    .then((result) => {
                        return res.redirect("/admin-libro");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                let imagePath = "/" + image.path;
                Libro.update({ nombre: libroN, imagen: imagePath, relase_date: date, categoryId: categoria, editorialId: editorial, autorId: autor }, { where: { id: libroId } })
                    .then((result) => {
                        return res.redirect("/admin-libro");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }


        }).catch((err) => {
            console.log(err);
        });
};


exports.FiltroCategoria = (req, res, next) => {

    const categoria = req.body.Categoria;
    const categoria2 = req.body.Categoria2;
    let determina = true;

    Libro.findAll({
            include: [{ model: Categoria }, { model: Editorial }, { model: Autores }],
            where: {
                categoryId: {
                    [Op.or]: [categoria, categoria2]
                }
            }
        })
        .then((result) => {
            const libroF = result.map((result) => result.dataValues);


            res.status(200).render("libros/filtro", {
                pageTitle: "Filtro por categorias",
                libroF: libroF,
                filtro: determina,
                hasLibroF: libroF.length > 0

            });
        }).catch((err) => {
            console.log(err);
        });

};

exports.FiltroNombre = (req, res, next) => {

    const nombre1 = req.body.Nombre;
    let determina = true;

    Libro.findAll({ include: [{ model: Categoria }, { model: Editorial }, { model: Autores }], where: [{ nombre: nombre1 }] })
        .then((result) => {
            const libro = result.map((result) => result.dataValues);


            res.status(200).render("libros/filtro-nombre", {
                pageTitle: "" + nombre1,
                nombre: nombre1,
                libroF2: libro,
                filtro: determina,
                hasLibroF2: libro.length > 0
            });
        }).catch((err) => {
            console.log(err);
        });

};

exports.GetDetalles = (req, res, next) => {
    const libroId = req.params.libroId;

    Autores.findAll()
        .then((result) => {
            const autor = result.map((result) => result.dataValues);
            Categoria.findAll().then((result) => {
                const categoria = result.map((result) => result.dataValues);
                Editorial.findAll().then((result) => {
                    const editorial = result.map((result) => result.dataValues);
                    Libro.findOne({ include: [{ model: Categoria }, { model: Editorial }, { model: Autores }], where: { id: libroId } })
                        .then((result) => {
                            const libro = result.dataValues;
                            res.render("libros/detalles", {
                                pageTitle: "detales",
                                libro: libro,
                                hasLibros: libro.length > 0,
                                autor: autor,
                                editorial: editorial,
                                categoria: categoria,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });
        });
};