const db = require("../db/db");

const get_user = (req, res) => {
  const sql = "SELECT * FROM usuario";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json ({ Error: "Intente mas tarde" });
    }
    res.json(rows);
  });
};

const find_user = (req, res) => {
  const {id} = req.params;
  const sql = `SELECT * from usuario where id_usuario= ?`;
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: `Intente mas tarde` });
    }
    if(rows.length==0){
      return res.status(404).json({ error: `Usuario no encontrado` });
    }
    console.log(rows)
    res.json(rows[0]);
  });
};

const create_user = (req, res) => {
  const {nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento} = req.body;
  
  const sql = `INSERT INTO usuario (nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.send("Usuario creado");
    res.json(result);
  });
};

module.exports = {
  get_user,
  find_user,
  create_user,
};
