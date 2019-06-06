var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

const app = express();
const PORT = 3000;


//body-parser set up
app.use(bodyParser.urlencoded({extended: true}));
//set up morgan to log http requests
app.use(logger("dev"));

//routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//public files
app.use(express.static("public"));

//handlebars as engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
)
app.set("view engine", "handlebars")
//set up connection to DB

mongoose.connect("mongodb://localhost/headlines", {useNewUrlParser: true})






app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})