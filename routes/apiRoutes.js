const cheerio = require("cheerio");
const request = require("request");

module.exports = (app, db) => {

    app.get("/scrape", (req, res) => {
        request('https://www.nationalgeographic.com/latest-stories/', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
              var doc = $.html(".lead-component")
              console.log("count:" + doc +"l")
            }
          });
        res.send("hello api scrape route");
    })


}
