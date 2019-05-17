const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")

const app = express();
let PORT = 3000

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})