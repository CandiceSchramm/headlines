var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: {
        type: String
    },
    link: {
        type: String
    },
    saved: {
        type: Boolean,
        default: true
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article;