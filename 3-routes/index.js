const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

// Set up mongodb connect url.
const user = process.env.MONGODB_RWU;
const ww = process.env.MONGODB_RWP;
const mongoport = 27017;
const ip = "192.168.1.90";
const db = "de_kelder";
const collinks = "links";
const MongoClient = mongodb.MongoClient;
//const mongourl = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db;
const mongourl = "mongodb://localhost:27017/de_kelder";

// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title : title });
    });
}

// The landing page.
router.get("/", (req, res, next) => {
    // Get the hostname from the url.
    var urlbar = req.headers.host.split(":");
    MongoClient.connect(mongourl, (err, db) => {
        if (err) {
            console.log("Unable to connect to the server");
        } else {
            console.log("Connection established");
            var linkcol = db.collection(collinks);
            linkcol.find({}).sort({url:1}).toArray((err, result) => {
                if (err) {
                    res.render("error", { // Change to error pug later.
                        error : err
                    });
                } else if (result.length) {
                    res.render("index", {
                        links : result,
                        // Pass through the hostname to easily switch between env.
                        url : urlbar[0]
                    });
                } else {
                    res.render("error", { // Change to error later.
                        error : "No documents found"
                    });
                }
                db.close();
            });
        }
    });
});

// Wake my PC.
router.get("/wol", (req, res, next) => {
    exec("wolpc", (err, stdout, stderr) => {
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

// Just get a simple page.
getPage("/test", "index", "Test");

router.get("/test2", (req, res, next) => {
    res.send("Dit is test 2 bitch!");
});

module.exports = router;