const express = require("express");
const connection = require("./config/db");

//routers
const clientRouter = require("./Routers/client");

//execution bd
// require("./config/db");
connection();
// creation serveur
const server = express();

// Variable d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Middleware pour parser les données
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(express.json());

//   Mes routes
server.use("/", clientRouter);
server.get("/", (req, res) => {
  res.status(200).send("BIENVENU A NOTRE PAGE DE LA BOUTIQUE DE BISCUIT");
});

server.listen(process.env.PORT, () => {
  console.log(`server est lancé sur le prot ${process.env.PORT}`);
});
