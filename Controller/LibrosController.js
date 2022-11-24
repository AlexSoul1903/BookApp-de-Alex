const Libro = require("../models/Libros");
const Categoria = require("../models/Categorias");
const Editorial = require("../models/Editorial");
const Autores = require("../models/Autores");

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
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
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


exports.FiltroRegion = (req, res, next) => {

    const region = req.body.Region;
    let determina = true;
    const reg = req.body.RegionName;

    Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }], where: [{ regionId: region }] })
        .then((result) => {
            const pokemonF = result.map((result) => result.dataValues);

            Region.findOne({ where: [{ id: region }] })
                .then((result) => {
                    const reg = result.dataValues.nombre;



                    res.status(200).render("pokemons/filtro", {
                        pageTitle: "Pokemons de " + reg,
                        region: reg,
                        pokemonsF: pokemonF,
                        filtro: determina,
                        hasPokemonF: pokemonF.length > 0

                    });
                }).catch((err) => {
                    console.log(err);
                });

        });

}

exports.FiltroNombre = (req, res, next) => {

    const nombre1 = req.body.Nombre;
    let determina = true;



    Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }], where: [{ nombre: nombre1 }] })
        .then((result) => {
            const poke = result.map((result) => result.dataValues);


            res.status(200).render("pokemons/filtro-nombre", {
                pageTitle: "" + nombre1,
                nombre: nombre1,
                pokemonsF2: poke,
                filtro: determina,
                hasPokemonF2: poke.length > 0
            });
        }).catch((err) => {
            console.log(err);
        });

};