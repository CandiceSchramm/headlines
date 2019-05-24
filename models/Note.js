var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
})

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;