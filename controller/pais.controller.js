const db = require("../db/db");

const getAllPaises = (req, res) => {
  const sql = "SELECT * FROM pais";

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "No se puedo encontrar ningún país" });
    }

    return res.json(result);
  });
};

const createPais = (req, res) => {
  const { nombre_pais } = req.body;
  const sql = "INSERT INTO pais (nombre_pais) VALUES (?)";

  db.query(sql, [nombre_pais], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json({
      message: "País agregados con éxito",
      pais: `${nombre_pais}`,
    });
  });
};

const updatePais = (req, res) => {
  const { id_pais } = req.params;
  const { nombre_pais } = req.body;
  const sql = `
    UPDATE pais
    SET nombre_pais = ?
    WHERE id_pais = ?
    `;

  db.query(sql, [nombre_pais, id_pais], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json({
      message: "Se actualizo correctamente el pais",
      nuevoPais: `${nombre_pais}`,
    });
  });
};

const deletePais = (req, res) => {
  const { id_pais } = req.params;
  const sql = "DELETE FROM pais WHERE id_pais = ?";

  if (!id_pais) {
    return res.send({ message: "No se proporcionó id de pais" });
  }

  db.query(sql, [id_pais], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json({ message: "País eliminado correctamente" });
  });
};

module.exports = {
  getAllPaises,
  createPais,
  updatePais,
  deletePais,
};
