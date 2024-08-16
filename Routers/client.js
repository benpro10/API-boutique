const express = require("express");
const router = express.Router();
const { createClient, getAllClient } = require("../Controllers/client");

router.post("/createclient", createClient);
router.get("/listclient", getAllClient);

module.exports = router;
