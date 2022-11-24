const express = require("express");
const path = require("path");

const router = express.Router();

const autoresController = require("../Controller/AutoresController");

router.get("/autor", autoresController.GetAutor);
router.get("/save-autor", autoresController.GetSaveAutor);
router.post("/save-autor", autoresController.PostSaveAutor);
router.post("/delete-autor", autoresController.PostDeleteAutors);
router.get("/edit-autor/:autorId", autoresController.GetEditAutor);
router.post("/edit-autor", autoresController.PostEditAutor);


module.exports = router;