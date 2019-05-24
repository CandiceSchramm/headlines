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
        default: false
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article;