// lógica para endpoints CRUD

const db = require("../db/db");

const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM peliculas';
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        res.json(rows);
    });
};

const showMovieById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM peliculas WHERE id_pelicula = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "No existe la película" });
        }
        console.log(rows)
        res.json(rows[0]);
    });
};

const createMovie = (req, res) => {
    const { nombre, categoria, pais } = req.body;
    const sql = "INSERT INTO peliculas (nombre, categoria, pais) VALUES (?, ?, ?)";
    db.query(sql, [nombre, categoria, pais], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        const pelicula = { id: result.insertId, nombre, categoria, pais };
        res.status(201).json(pelicula);
    });
};

const updateMovie = (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, pais } = req.body;
    const sql = 'UPDATE peliculas SET nombre = ?, categoria = ?, pais = ? WHERE id = ?';
    db.query(sql, [nombre, categoria, pais, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "No existe la película" });
        }
        res.json({ message: "Película actualizada con éxito" });
    });
};

const deleteMovie = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM peliculas WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "No existe la película" });
        }
        res.json({ message: "Película eliminada con éxito" });
    });
};

module.exports = {
    getAllMovies,
    showMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
