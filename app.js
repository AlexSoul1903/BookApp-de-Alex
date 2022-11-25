const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const ErrorController = require("./Controller/ErrorController");
const sequelize = require("./util/database");

const Autores = require("./models/Autores");
const Editoriales = require("./models/Editorial");
const Categoria = require("./models/Categorias");
const Libros = require("./models/Libros");

const home = require("./routes/libro");
const libro = require("./routes/libro");
const editoriales = require("./routes/editoriales");
const categoria = require("./routes/categoria");
const autores = require("./routes/autores");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const comparador = require("./util/helpers/hbs/comarar");

app.engine('hbs', expressHbs({

    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        IgualValor: comparador.IgualValor,

    },
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "images");
    },
    filename: (req, file, cb) => {

        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});

app.use(multer({ storage: imageStorage }).single("Image"));

app.use(home);
app.use(editoriales);
app.use(libro);
app.use(categoria);
app.use(autores);
app.use("/", ErrorController.Get404);


Libros.belongsTo(Categoria, { constraint: true, onDelete: "CASCADE" });
Categoria.hasMany(Libros);


Libros.belongsTo(Autores, { constraint: true, onDelete: "CASCADE" });
Autores.hasMany(Libros);

Libros.belongsTo(Editoriales, { constraint: true, onDelete: "CASCADE" });
Editoriales.hasMany(Libros);

Libros.belongsTo(Categoria, { constraint: true, onDelete: "CASCADE" });
Categoria.hasMany(Libros);

sequelize.sync({ alter: true }).then(function(result) {

    app.listen(44190);

}).catch(err => {

    console.log(err);

})