const cheerio = require("cheerio");
const request = require("request");
const db = require("../models");



module.exports = (app) => {

//create articles by scraping
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
      return res.json(savedArticles);
    })
    .catch(function(err) {
      return res.json(error);
    })
  })

  //create or update a note
  app.post("/updateNote/:ArticleId", (req, res) => {
    db.Note.create({title: req.body.title, body: req.body.body})
    .then(function(dbNote) {
      db.Article.findOneAndUpdate({_id: req.params.ArticleId}, {$push: {notes: dbNote._id}}, {new: true, upsert: true})
    })
    .then(function(articleWithNote) {
      return res.json(articleWithNote)
    })
    .catch(function(err) {
      return res.json(err);
    })
  })

  //get one note by ID
  app.get("/note/:noteId", (req, res) => {
    db.Note.find({_id: req.params.noteId})
    .then(function(noteFound) {
      return res.json(noteFound);
    })
    .catch(function(err) {
      return res.json(err);
    })
  })

  //get one article with notes populated
  app.get("article/:id", (req, res) => {
    db.Article.findOne({_id: req.params.id})
    .populate("notes")
    .then(function(articleWithNotes) {
      return res.json(articleWithNotes)
    })
  })

  //get all notes
  app.get("allNotes", (req, res) => {
    db.Note.find({})
    .then(function(notesFound) {
      return res.json(notesFound);
    })
    .catch(function(err) {
      return res.json(err);
    })
  })

  
  //save an article
  app.put("saveArticle/:articleId", (req, res) => {
    db.Article.indByIdAndUpdate({_id: articleId}, {saved: true}, { new: true })
    .then(function(updatedArticle) {
      return res.json(updatedArticle);
    })
    .catch(function(err) {
      return res.json(err);
    })
  })

  //delete 1 note
  app.delete("deleteNote/:noteId", (req, res) => {
    db.Note.findByIdAndDelete({_id: noteId})
  })
  .then(function(stuffReturned) {
    return res.json(stuffReturned);
  })
  .catch(function(err) {
    return res.json(err);
  })

}


