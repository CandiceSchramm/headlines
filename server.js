var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;


//body-parser set up
app.use(bodyParser.urlencoded({extended: false}));

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

//routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})