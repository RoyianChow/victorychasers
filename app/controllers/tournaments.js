import tournamentModel from '../models/tournaments.js';

//Read Operations
export function DisplayTournamentsList(req, res, next){
tournamentModel.find(function (error, tournamentCollection){
if(error){
console.error(error);
res.end(error);
}
console.log(tournamentCollection);

res.render('index', {title: 'Tournament List', page: 'tournaments/list', tournaments: tournamentCollection })
})
}

//Create
export function DisplayTournamentsAddPage(req, res, next){
res.render('index', {title: 'Add Tournament', page: 'tournaments/edit', tournament: {}})
}

export function ProcessTournamentsAddPage(req, res, next){
let newTournament = tournamentModel({
name: req.body.name,
game: req.body.game,
startDate: req.body.startDate,
endDate: req.body.endDate,
location: req.body.location
});
tournamentModel.create(newTournament,function(error, tournament){
    if(error){
        console.error(error);
        res.end(error);
    }

    res.redirect('/tournament-list');
})
}

//Update
export function DisplayTournamentsEditPage(req, res, next){let id = req.params.id;

    tournamentModel.findById(id, function(error, tournament){
        if(error){
            console.error(error);
            res.end(error);
        }
    
        res.render('index', {title: 'Edit Tournament', page: 'tournaments/edit', tournament})
    })    
}

export function ProcessTournamentsEditPage(req, res, next){
let id = req.params.idlet, editTournament = tournamentModel({
    _id: req.body.id,
    name: req.body.name,
    game: req.body.game,       
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location
});

tournamentModel.updateOne({_id: id}, editTournament,function(error, tournament){
    if(error){
        console.error(error);
        res.end(error);
    }

    res.redirect('/tournament-list');
})
}

//Delete
export function ProcessTournamentsDelete(req, res, next){
let id = req.params.idtournamentModel.remove({_id: id}, function(error){
    if(error){
        console.error(error);
        res.end(error);
    }

    res.redirect('/tournament-list');
})
}    