const mongoose = require("mongoose");

//genres Schema
const genresSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Genre", genresSchema );

//Get genres
module.exports.getGenres = function(callback, limit) {
    Genre.find(callback).limit(limit);
}

//Add genres
module.exports.addGenre = function(genre, callback) {
    Genre.create(genre, callback)
}

//Update genres
module.exports.updateGenre = function(id, genre, options, callback) {
    let query = {_id: id};
    let update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback)
}

//Delete genres
module.exports.deleteGenre = function(id, callback) {
    let query = {_id: id};
    Genre.remove(query, callback)
}