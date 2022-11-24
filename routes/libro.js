const express = require("express");
const path = require("path");

const router = express.Router();


const LibrosController = require("../Controller/LibrosController");
const Libros = require("../models/Libros");

router.get("/", LibrosController.GetIndex);
router.get("/admin-libro", LibrosController.GetAdminLibro);
router.get("/save-libro", LibrosController.GetSaveLibro);
router.post("/save-libro", LibrosController.PostSaveLibro);
router.get("/edit-libro/:libroId", LibrosController.GetEditLibro);
router.post("/delete-libro", LibrosController.PostDeleteLibro);
router.post("/edit-libro", LibrosController.PostEditLibro);
module.exports = router;