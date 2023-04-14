
import tournamentsModel from '../models/tournaments.js';
import playerModel from '../models/player-schema.js';

import { UserDisplayName } from "../utils/index.js";


/* GET tournaments List page. READ */
export function displayTournamentList(req, res, next) {
    // find all tournaments in the tournaments collection
    tournamentsModel.find((err, tournamentsCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Tournament List', page: 'tournaments/list', tournaments: tournamentsCollection,displayName: UserDisplayName(req) });
    });
}
//  GET the tournament Details page in order to add a new tournament
export function displayAddPage(req, res, next) {
    // render the add page with a default empty tournament object
    res.render('index', { title: 'Tournament Add', page: 'tournaments/add', tournament: {},displayName: UserDisplayName(req) });

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
            res.render('index', { title: 'Tournament Edit', page: 'tournaments/edit', tournament: tournament, displayName: UserDisplayName(req) });
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
                playerModel.find({tournament:id},(err, players) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    
                // Render the view.ejs template with the tournament information
                res.render('index', { title: 'Tournament View', page: 'tournaments/view',players,tournament ,id:id,displayName: UserDisplayName(req) });
            });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }
    })
}


  
export function processViewTournament(req, res, next) {
    let id = req.params.id;

    // Find the tournament in the tournaments collection by its ID
    tournamentsModel.findById(id, (err, tournament) => {
       
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Check if the tournament exists
            if (tournament) {
                playerModel.find({tournamentId:id},(err, players) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.render('index', { title: 'Tournament List', page: 'tournaments/list',players,tournament ,displayName: UserDisplayName(req) });
                });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }

    });
   
}
export function displayPlayerAddPage(req, res, next) {
    let id = req.params.id;
    console.log("TournamentId" + id)
    // render the add page with a default empty player object
    res.render('index', { title: 'Tournament Add Team', page: 'tournaments/player', id:id ,player: {},displayName: UserDisplayName(req) });
}
// POST process the player Details page and create a new tournament - CREATE
export function processPlayerAddPage(req, res, next) {
    let id = req.params.id;
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            let newPlayer =  playerModel({
                team_name: req.body.team_name,
                tournament: tournament._id
            });

            newPlayer.save((err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    // redirect to the tournament list page
                    res.redirect('/tournaments/view/'+id);
                }
            });
        }
    });
}



// POST - process the information passed from the details form and update the document
export function processPlayerEditPage(req, res, next) {
    let id = req.params.id;
    let team = req.body.teams;
    let team_name1= req.body.new_name;

    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Prepare the update object
            

            // Update all players with the given team_name
            playerModel.updateOne({ team_name: team }, { team_name: team_name1 }, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    // Redirect to the tournament list page
                    res.redirect('/tournaments/view/' + id);
                }
            });
        }
    });
}

// GET the tournament Details page in order to edit an existing tournament

export function displayPlayerEditPage(req, res, next) {
    let id = req.params.id;

    // Find the tournament in the tournaments collection by its ID
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Check if the tournament exists
            if (tournament) {
                playerModel.find({tournament:id},(err, players) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                
                    
                // Render the view.ejs template with the tournament information
                res.render('index', { title: 'Tournament Edit Player', page: 'tournaments/editPlayer',players,tournament ,id:id,displayName: UserDisplayName(req) });
            });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }
});
}export function displayWinOrLoss(req, res, next) {
    let id = req.params.id;

    // Find the tournament in the tournaments collection by its ID
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Check if the tournament exists
            if (tournament) {
                playerModel.find({tournament:id},(err, players) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                
                    
                // Render the view.ejs template with the tournament information
                res.render('index', { title: 'Tournament win loss', page: 'tournaments/winOrLoss',players,tournament ,id:id,displayName: UserDisplayName(req) });
            });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }
    });
}

export function processPlayerWinLossPage(req, res, next) {
    let id = req.params.id;
    let team = req.body.teams;
    let val= req.body.winOrLoss;

    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Prepare the update object
            

            // Update all players with the given team_name
            playerModel.updateOne({ team_name: team }, { win_loss: val }, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    // Redirect to the tournament list page
                    res.redirect('/tournaments/view/' + id);
                }
            });
        }
    });
}// POST - process the information passed from the details form and update the document
export function processPlayerDeletePage(req, res, next) {
    let id = req.params.id;
    let team = req.body.teams;

    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Prepare the update object
            

            // delete  player with the given team_name
            playerModel.deleteOne({ team_name: team },  (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    // Redirect to the tournament list page
                    res.redirect('/tournaments/deleteplayer/' + id);
                }
            });
        }
    });
}

// GET the tournament Details page in order to edit an existing tournament

export function displayPlayerDeletePage(req, res, next) {
    let id = req.params.id;

    // Find the tournament in the tournaments collection by its ID
    tournamentsModel.findById(id, (err, tournament) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            // Check if the tournament exists
            if (tournament) {
                playerModel.find({tournament:id},(err, players) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                
                    
                // Render the view.ejs template with the tournament information
                res.render('index', { title: 'Tournament delete Player', page: 'tournaments/deleteplayer',players,tournament ,id:id,displayName: UserDisplayName(req) });
            });
            } else {
                // Send a 404 status and an error message if the tournament is not found
                res.status(404).send('Tournament not found');
            }
        }
});
}