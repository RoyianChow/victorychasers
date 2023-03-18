//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
// define the book model
import tournamentsModel from '../models/tournaments.js';

/* GET books List page. READ */
export function displayTournamentList(req, res, next) {
    // find all books in the books collection
    tournamentsModel.find((err, tournamentsCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Tournament List', page: 'tournaments/list', tournaments: tournamentsCollection });
    });
}
//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
    // render the add page with a default empty book object
    res.render('content/tournaments/add', { title: 'Add a New Tournament', tournament: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
    // create a new book object from the request's body
    let newTournament = new tournamentsModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // save the new book to the database
    newTournament.save((err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/tournaments/list');
        }
    });
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // find the book by id in the database
    tournamentsModel.findById(id, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // render the edit page with the book object
            res.render('content/tournaments/edit', { title: 'Edit Tournament', tournament: tournament });
        }
    });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // create a new book object with the updated values
    let updatedTournament = new tournamentsModel({
        _id: id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // update the book in the database
    tournamentsModel.updateOne({ _id: id }, updatedTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/tournaments/list');
        }
    });
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // remove the book from the database
    tournamentsModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the book list page
            res.redirect('/tournaments/list');
        }
    });
}
