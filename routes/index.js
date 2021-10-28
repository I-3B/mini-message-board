var express = require("express");
var router = express.Router();
var messageSchema = require("../modules/message");
var mongoose = require("mongoose");

var Message = require("../modules/message");
require("dotenv").config();
var mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function (req, res, next) {
    var query = messageSchema.find().count();
    query.exec(function (err, messagesCount) {
        if (err) console.error(err);
        if (messagesCount == 0) {
            let message = new Message({
                name: "I3B",
                content: "hello there!\ntry sending a message!!",
                timeStamp: new Date(),
            });
            message.save(function (err) {
                if (err) {
                    cb(err, null);
                    return;
                }
                query = messageSchema.find();
                query.exec(function (err, result) {
                    if (err) console.log(err);
                    res.render("index", {
                        title: "Messages Board",
                        messages: result,
                    });
                });
            });
        } else {
            query = messageSchema.find().limit(20).sort({ _id: -1 });
            query.exec(function (err, result) {
                if (err) console.log(err);
                res.render("index", {
                    title: "Messages Board",
                    messages: result.reverse(),
                });
            });
            query = messageSchema.deleteMany({
                timeStamp: {
                    $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            });
            query.exec(function (err, result) {
                if (err) console.error(err);
                console.log("messages older than one week got deleted");
            });
        }
    });
});

module.exports = router;
