require("dotenv").config();
const axios = require("axios");
const db = require("../models");
const key = process.env.API_KEY;

module.exports = {
    findAllPost: function(req, res){
        db.Post.findAll({}).then(function(dbPost){
            res.json(dbPost).catch((err) => res.status(402).json(err));
        })
    },
    createNewPost: function(req, res){
        db.Post.create({
            author: req.body.author,
            body: req.body.body,
            created_at: req.body.created_at
        }).then(function(dbPost){
            res.json(dbPost).catch((err) => res.status(402).json(err));
        })
    },
    quoteOfTheDay: function (req, res) {
        axios.get("http://quotes.rest/quote/search.json?minlength=100&maxlength=300")
        .then((res) => res.json(res.data))
        .catch((err) => res.status(422).json(err));

    },
    findAllWhere: function(req, res){
        db.Categories.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(dbQuotes){
            res.json(dbQuotes).catch((err) => res.status(402).json(err))
        })
    }
  
}