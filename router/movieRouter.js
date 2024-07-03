// rutas y los métodos HTTP asociados

const express = require("express");
const router = express.Router();
const movieController = require('../controller/movieController');

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.showMovieById);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;