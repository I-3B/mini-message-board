var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    name: { type: String, minlength: 1 },
    content: {
        type: String,
        minlength: 1,
        maxlength: 2000,
    },
    timeStamp: {
        type: Date,
    },
});

//Export model
module.exports = mongoose.model("message", messageSchema);
