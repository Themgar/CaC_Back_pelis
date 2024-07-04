const express = require("express");
const router = express.Router();
const paisController = require("../controller/pais.controller");

router.get("/", paisController.getAllPaises);
router.post("/crear", paisController.createPais);
router.put("/actualizar/:id_pais", paisController.updatePais);
//router.delete("/eliminar/:id_pais", paisController.deletePais); NO SE PUEDE ELIMINAR UN PAIS XQ TIENE FK EN CLIENTE

module.exports = router;
