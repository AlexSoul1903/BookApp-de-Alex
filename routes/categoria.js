const express = require("express");
const path = require("path");

const router = express.Router();

const CategoriasControler = require("../Controller/CategoriaController");

router.get("/categorias", CategoriasControler.GetCategoria);

router.get("/save-categoria", CategoriasControler.GetSaveCategoria);
router.post("/save-categoria", CategoriasControler.PostSaveCategoria);
router.post("/delete-categoria", CategoriasControler.PostDeleteCategoria);
router.get("/edit-categoria/:categoriaId", CategoriasControler.GetEditCategoria);
router.post("/edit-categoria", CategoriasControler.PostEditCategoria);



module.exports = router;