const express = require("express");
const router = express.Router();
// const mongodb = require("mongodb");
const { Pool, Client } = require("pg");
const exec = require("child_process").exec;

// Set up mongodb connect url.
// const user = process.env.MONGODB_RWU;
// const ww = process.env.MONGODB_RWP;
// const mongoport = 27017;
// const ip = "192.168.1.90";
// const db = "de_kelder";
// const collinks = "links";
// const MongoClient = mongodb.MongoClient;
// //const mongourl = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db;
// const mongourl = "mongodb://localhost:27017/de_kelder";

// Set up the postgres connect url.
const user = process.env.PSQLU;
const ww = process.env.PSQLW;
const host = "192.168.1.90";
const psqlport = 5432;
const db = "dekelder";
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db;
// Create a new client.
// const client = new Client({
//     connectionString: connStr
// });
const client = new Client({
    user: user,
    host: host,
    database: db,
    password: ww,
    port: psqlport
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

// The landing page.
// router.get("/", (req, res, next) => {
//     // Get the hostname from the url.
//     var urlbar = req.headers.host.split(":");
//     MongoClient.connect(mongourl, (err, db) => {
//         if (err) {
//             console.log("Unable to connect to the server");
//         } else {
//             console.log("Connection established");
//             var linkcol = db.collection(collinks);
//             linkcol.find({}).sort({url:1}).toArray((err, result) => {
//                 if (err) {
//                     res.render("error", { // Change to error pug later.
//                         error : err
//                     });
//                 } else if (result.length) {
//                     res.render("index", {
//                         links : result,
//                         // Pass through the hostname to easily switch between env.
//                         url : urlbar[0]
//                     });
//                 } else {
//                     res.render("error", { // Change to error later.
//                         error : "No documents found"
//                     });
//                 }
//                 db.close();
//             });
//         }
//     });
// });

getPage("/", "index", "Home");

// Wake my PC.
router.get("/wol", (req, res, next) => {
    exec("/wol.sh", (err, stdout, stderr) => {
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
