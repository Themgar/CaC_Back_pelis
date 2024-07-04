const express = require("express");
const app = express();
app.use(express.json());

app.use("/users", require("./router/user.router"));

const PORT = 3000;
app.listen(PORT, () => console.log(`http://Localhost:${PORT}`));
