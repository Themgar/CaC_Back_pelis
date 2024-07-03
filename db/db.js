const mysql = require("mysql2");
const connection = mysql.createConnection({
host: `localhost`,
user: `root`,
password:  ``, 
database: `db_pelis`
});
connection.connect((error) =>{
    if(error){
        console.error("No se pudo conectar con la base de datos");
        return;
    }
    console.log("Base de datos conectada");
});
module.exports=connection;