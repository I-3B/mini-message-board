var express = require("express");
var router = express.Router();
var messageSchema = require("../modules/message");
var mongoose = require("mongoose");
require("dotenv").config();
var mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function (req, res, next) {
    var query = messageSchema.find().limit(20).sort({ _id: -1 });
    query.exec(function (err, result) {
        if (err) return handleError(err);
        res.render("index", {
            title: "Messages Board",
            messages: result.reverse(),
        });
    });
    var query = messageSchema;
});

module.exports = router;
