//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
// define the tournament model
import tournamentsModel from '../models/tournaments.js';



/* GET tournaments List page. READ */
export function displayTournamentList(req, res, next) {
    // find all tournaments in the tournaments collection
    tournamentsModel.find((err, tournamentsCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Tournament List', page: 'tournaments/list', tournaments: tournamentsCollection });
    });
}
//  GET the tournament Details page in order to add a new tournament
export function displayAddPage(req, res, next) {
    // render the add page with a default empty tournament object
    res.render('index', { title: 'Tournament Add', page: 'tournaments/add', tournament: {} });

}

// POST process the tournament Details page and create a new tournament - CREATE
export function processAddPage(req, res, next) {
    // create a new tournament object from the request's body
    let newTournament = new tournamentsModel({
        name: req.body.name,
        game: req.body.game,
        organizer: req.body.organizer,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        max_players: req.body.max_players,
        description: req.body.description
    
    });
    
 {
    // save the new tournament to the database
    newTournament.save((err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the tournament list page
            res.redirect('/tournaments/list');
        }
    });
}}

// GET the tournament Details page in order to edit an existing tournament
export function displayEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // find the tournament by id in the database
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // render the edit page with the tournament object
            res.render('index', { title: 'Tournament Edit', page: 'tournaments/edit', tournament: {} });

            
        }
    });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // create a new tournament object with the updated values
    let updatedTournament = new tournamentsModel({
        _id: id,
        name: req.body.name,
        game: req.body.game,
        organizer: req.body.organizer,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        max_players: req.body.max_players,
        description: req.body.description
    });

    // update the tournament in the database
    tournamentsModel.updateOne({ _id: id }, updatedTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the tournament list page
            res.redirect('/tournaments/list');
        }
    });
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    // get the id from the request parameters
    let id = req.params.id;

    // remove the tournament from the database
    tournamentsModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            // redirect to the tournament list page
            res.redirect('/tournaments/list');
        }
    });
}
  
export function displayViewTournament(req, res, next) {
    let id = req.params.id;

    // Find the tournament in the tournaments collection by its ID
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Check if the tournament exists
            if (tournament) {
                // Render the view.ejs template with the tournament information
                res.render('index', { title: 'Tournament View', page: 'tournaments/view', tournament });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }
    });
}
