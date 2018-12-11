// -------------- SET UP STUFF --------------

// Required packages.
const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")

// Call the routers and declare the app.
const indexRouter = require("./3-routes/index")
const recipeRouter = require("./3-routes/recipes")
const app = express()

// Stop anything from being shown about the server.
app.disable("x-powered-by")

// Set the folder for the pug files and make the source pretty.
app.set("views", path.join(__dirname, "0-views"))
app.set("view engine", "pug")
app.locals.pretty = true


// --------------- MIDDLEWARE ---------------

// Set the public folder
app.use(express.static(path.join(__dirname, "1-public")))
// Set the favicon.
app.use(favicon(path.join(__dirname, "1-public", "favicon-new.png")))

// Use the routes.
app.use("/", indexRouter)
app.use("/recipes", recipeRouter)

// 404 errors.
app.use( (req, res, next) => {
    next(createError(404))
});

// Error handler.
app.use( (err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page.
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app
