// Code concerning the main page.

const express = require("express")
const router = express.Router()
const { Client } = require("pg")
const { execFile } = require("child_process")
require("dotenv").config({ path: "/var/www/html/kelder/.env" })

// Set up the postgres connect url.
const user = process.env.PSQLU
const ww = process.env.PSQLW
const host = "192.168.1.90"
const psqlport = 5432
const db = "dekelder"
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db

// Create a new client.
const client = new Client({
    connectionString: connStr
})
client.connect()

// Make a query.
const query = "select * from projects order by id asc"
const oefenenQuery = "select * from oefenen order by port asc"
const projectenQuery = "select * from projecten order by port asc"

// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title : title })
    })
}

// Get the main page.
router.get("/", (req, res, next) => {
    let url = req.headers.host.split(":")
    client.query(oefenenQuery).then(oefenen => {
        client.query(projectenQuery).then(projecten => {
            res.render("index", {
                data: [oefenen, projecten],
                // Pass the ip address in the url to easily switch between hosts.
                url: url[0]
            })
        }).catch(e => console.error(e.stack))
    }).catch(error => console.error(error.stack))
})

router.get("/old", (req, res, next) => {
    let url = req.headers.host.split(":")
    client.query(query)
        .then(data => res.render("old", {
            links: data,
            // Pass the ip address in the url to easily switch between hosts.
            url: url[0]
        }))
        .catch(e => console.error(e.stack))
})

// Some get requests for the switches.
router.get("/req/:ip/:power", (req, res, next) => {
    const ip = String(req.params.ip)
    const power = String(req.params.power)
    execFile("curl", ["-sS", "http://192.168.1." + ip + "/?power=" + power], (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else if (stderr) {
            console.log(stderr)
        } else {
            console.log(stdout)
        }
    })
})

// Wake my PC.
router.get("/wol", (req, res, next) => {
    execFile("./wol.sh", [], (err, stdout, stderr) => {
        if (err) {
             console.log(err)
             res.redirect("/")
         } else if (stderr) {
             console.log(stderr)
             res.redirect("/")
         } else {
             console.log(stdout)
             res.redirect("/")
         }
    })
})

module.exports = router
