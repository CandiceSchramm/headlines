const cheerio = require("cheerio");
const request = require("request");

module.exports = (app, db) => {

  //CREATE: scraping articles and adding them to the DB
  app.get("/scrape", (req, res) => {
    request('https://www.wsj.com/', function (error, response, html) {
      if (error) {
        console.log("We've got a problem: " + error);
      } else {
        var $ = cheerio.load(html);
        $(".frontpage").find("h3").each(function (i, el) {
          var headline = $(this).text();
          var link = $(this).children().attr("href");
          if (link && headline) {
            var article = {
              headline: headline,
              link: link
            }
            //will want function to add article class to mongo
            console.log(article);
          }

        })
      }
    });
    res.send("hello api scrape route");
  })


}
