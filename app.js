const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/database")



Genre = require("./models/genres");
Book = require("./models/books");


//Connect to Mongoose 
mongoose.connect(config.database);
let db = mongoose.connection;

//Check for connection
db.once("open", () => {
    console.log("Connected to mongoDB")
})

//Check for DB errors
db.on("error", (err) => {
    console.log(err)
})

//Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Home route
app.get("/", (req, res) => {
    res.send("Please use /api/books or /api/genres")
})

//Genre route
app.get("/api/genres", (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err) {
            throw err
        }
        res.json(genres);
    })
})

//Add genre route
app.post("/api/genres", (req, res) => {
    let genre = req.body
    Genre.addGenre(genre, (err, genre) => {
        if (err) {
            throw err
        }
        res.json(genre);
    })
})

//Update genre route
app.put("/api/genres/:_id", (req, res) => {
    let id = req.params._id
    let genre = req.body
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if (err) {
            throw err
        }
        res.json(genre);
    })
})

//Delete genre route
app.delete("/api/genres/:_id", (req, res) => {
    let id = req.params._id
    Genre.deleteGenre(id, (err, genre) => {
        if (err) {
            throw err
        }
        res.json(genre);
    })
})

//Books route
app.get("/api/books", (req, res) => {
    Book.getBooks((err, books) => {
        if (err) {
            throw err
        }
        res.json(books);
    })
})

//Add book route
app.post("/api/books", (req, res) => {
    let book = req.body
    Book.addBook(book, (err, book) => {
        if (err) {
            throw err
        }
        res.json(book);
    })
})

//Update book route
app.put("/api/books/:_id", (req, res) => {
    let id = req.params._id
    let book = req.body
    Book.updateBook(id, book, {}, (err, book) => {
        if (err) {
            throw err
        }
        res.json(book);
    })
})

//Delete book route
app.delete("/api/books/:_id", (req, res) => {
    let id = req.params._id
    Book.deleteBook(id, (err, book) => {
        if (err) {
            throw err
        }
        res.json(book);
    })
})



//Book route
app.get("/api/books/:_id", (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if (err) {
            throw err
        }
        res.json(book);
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`))