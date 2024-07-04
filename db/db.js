const mysql = require("mysql2");
const connection = mysql.createConnection({
host: `mysql-zalogon2002.alwaysdata.net`,
user: `359814_cac_24131`,
password:  `DQ4zcZBFB$ta4XH`, 
database: `zalogon2002_cac_24131`
});
connection.connect((error) =>{
    if(error){
        console.error("No se pudo conectar con la base de datos");
        return;
    }
    console.log("Base de datos conectada");
});
module.exports=connection;