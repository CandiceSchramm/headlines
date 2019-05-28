const cheerio = require("cheerio");
const request = require("request");
const db = require("../models");

module.exports = (app) => {

//scrape articles
  app.get("/scrape", (req, res) => {
    request('https://www.wsj.com/', function (error, response, html) {
      if (error) {
        console.log("We've got a problem: " + error);
      } else {
        var $ = cheerio.load(html);
        $(".frontpage").find("h3").each(function (i, el) {
          var headline = $(this).text();
          var link = $(this).children().attr("href");
          //if we have both headline and a link:
          if (link && headline) {
            //crearte article oblject
            var article = {
              headline: headline,
              link: link
            }
            //then add article obj to DB
            db.article.create(article)
            .then(function(article) {
              console.log(article);
            })
            .catch(function(err) {
              return res.json(err);
            })
          }
        })
      }
    });
    res.send("website scraped");
  })

  //find all articles
  app.get("/all", (req, res) => {
    db.Article.find({})
    .then(function(results) {
      return res.json(results);
    })
    .catch(function(err) {
      return res.json(err);
    })
  })

//find saved articles
  app.get("/saved", (req, res) => {
    db.Article.find({"saved": true})
    .then(function(savedArticles) {
      res.json(savedArticles);
    })
    .catch(function(err) {
      return res.json(error);
    })
  })
}


