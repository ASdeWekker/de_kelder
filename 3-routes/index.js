const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const exec = require("child_process").exec;

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

// Make a query.
const query = "select * from projects";

// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title : title });
    });
}

router.get("/", (req, res, next) => {
    let url = req.headers.host.split(":");
    client.query(query)
        .then(data => res.render("index", {
            links : data,
            // Pass the ip address in the url to easily switch between hosts.
            url : url[0]
        }))
        .catch(e => console.error(e.stack));
});

// Wake my PC.
router.get("/wol", (req, res, next) => {
    exec("wol.sh", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else if (stderr) {
            console.log(stderr);
            res.redirect("/");
        } else {
            console.log(stdout);
            res.redirect("/");
        }
    })
})

module.exports = router;
