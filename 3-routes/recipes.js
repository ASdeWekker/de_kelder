// Code concerning the recipes page.

const express = require("express");
const router = express.Router();
const { Client } = require("pg");

// Set up the postgres connect url.
const user = process.env.PSQLU;
const ww = process.env.PSQLW;
const host = "192.168.1.90";
const psqlport = 5432;
const db = "dekelder";
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db;

// Create a new client.
const client = new Client({
    connectionString: connStr
});
client.connect();

// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title : title });
    });
}

getPage("/", "recipes", "Recepten");

module.exports = router;
