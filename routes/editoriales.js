const express = require("express");
const path = require("path");

let cantidad = 0;
const router = express.Router();

const EditorialControler = require("../Controller/EditorialController");

router.get("/editorial", EditorialControler.GetEditorial);


router.get("/save-editorial", EditorialControler.GetSaveEditorial);
router.post("/save-editorial", EditorialControler.PostSaveEditorial);
router.post("/delete-editorial", EditorialControler.PostDeleteEditorial);
router.get("/edit-editorial/:editorialId", EditorialControler.GetEditReditorial);
router.post("/edit-editorial", EditorialControler.PostEditEditorial);



module.exports = router;