const mongoose = require("mongoose");

//genres Schema
const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
    },
    pages:{
        type: String,
    },
    image_url:{
        type: String,
    },
    buy_url:{
        type: String,
    },
    create_date:{
        type: Date,
        default: Date.now
    },
});

// const Genre = module.exports = mongoose.model("Genre", genresSchema);
module.exports = mongoose.model("Book", bookSchema );

//Get books
module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
}

//Get single Book
module.exports.getBookById = function(id, callback) {
    Book.findById(id, callback)
}

//Add Book
module.exports.addBook = function(book, callback) {
    Book.create(book, callback)
}

//Update books
module.exports.updateBook = function(id, book, options, callback) {
    let query = {_id: id};
    let update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url
    }
    Book.findOneAndUpdate(query, update, options, callback)
}

//Delete books
module.exports.deleteBook = function(id, callback) {
    let query = {_id: id};
    Book.deleteMany(query, callback)
}