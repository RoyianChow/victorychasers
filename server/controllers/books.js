//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}
//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
    // render the add page with a default empty book object
    res.render('content/books/add', { title: 'Add a New Book', book: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
    // create a new book object from the request's body
    let newBook = new booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // save the new book to the database
    newBook.save((err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/books/list');
        }
    });
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // find the book by id in the database
    booksModel.findById(id, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // render the edit page with the book object
            res.render('content/books/edit', { title: 'Edit Book', book: book });
        }
    });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // create a new book object with the updated values
    let updatedBook = new booksModel({
        _id: id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // update the book in the database
    booksModel.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/books/list');
        }
    });
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // remove the book from the database
    booksModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/books/list');
        }
    });
}
