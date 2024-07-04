const db = require("../db/db");

const get_user = (req, res) => {
  const sql = "SELECT * FROM `usuario`";
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
  const {nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento, id_pais} = req.body;
  const pais = req.body.id_pais;
    if(pais==1){
      req.body.id_pais="Argentina";
    }
  const sql = `INSERT INTO usuario (nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento, id_pais) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento, id_pais], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    const usuario = { ...req.body, id: result.insertId};
    
    res.status(201).json(usuario);
  });
};

const delete_user = (req, res) => {
  const {id} = req.params;
  const sql = "DELETE FROM usuario WHERE `id_usuario` = ?";
  db.query(sql, [id], (error, result) => {
    if(error){
      return res.status(500) .json({error: "Intente mas tarde"});
    }
    res.status(201).send("Usuario eliminado");
  }) 
}

const modify_user = (req, res) => {
  const {id} = req.params;
  const {nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento, id_pais} = req.body;
  const sql = "UPDATE usuario set  nombre_usuario = ?, apellido_usuario = ?, email = ?, contraseña = ?, fecha_nacimiento = ?, id_pais = ? WHERE id_usuario = ?";
  db.query (sql, [nombre_usuario, apellido_usuario, email, contraseña, fecha_nacimiento, id_pais, id], (error,  rows) =>{
  if(error){
    return res.status(500).json({error: "Intente mas tarde"});
  }
  const usuario = { ...req.body, ...req.params};
  res.json(usuario);

})

}

module.exports = {
  get_user,
  find_user,
  create_user,
  delete_user,
  modify_user
};
