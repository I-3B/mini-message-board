var express = require("express");
var router = express.Router();
var Message = require("../modules/message");
var mongoose = require("mongoose");
require("dotenv").config();
var mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function (req, res, next) {
    res.render("new", { title: "new message" });
});
router.post("/", function (req, res, next) {
    let message = new Message({
        name: req.body.name,
        content: req.body.content,
        timeStamp: new Date(),
    });
    message.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
    });
    res.redirect("/");
});
module.exports = router;
