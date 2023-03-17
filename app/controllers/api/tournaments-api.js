import tournamentModel from '../../models/tournaments.js';

//Read Operations
export function GetList(req, res, next){
tournamentModel.find(function (error, tournamentCollection){
if(error){
console.error(error);
res.end(error);
}
console.log(tournamentCollection);
    
res.json({success: true, msg: 'Success', tournaments: tournamentCollection, user: req.user})       
})
}

export function Get(req, res, next){
let id = req.params.id;tournamentModel.findById(id, function (error, tournament){
    if(error){
        console.error(error);
        res.end(error);
    }

    console.log(tournament);
    
    res.json({success: true, msg: 'Success', tournament, user: req.user})       
})
}

//Create
export function Add(req, res, next){
let newTournament = tournamentModel({
    name: req.body.name,
    game: req.body.game,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location
});
tournamentModel.create(newTournament, function(error, tournament){
    if(error){
        console.error(error);
        res.end(error);
    }

    res.json({success: true, msg: 'Success', newTournament, user: req.user})
})
}

//Update
export function Edit(req, res, next){
let id = req.params.id;
let updatedTournament = new tournamentModel({
    "_id": id,
    name: req.body.name,
    game: req.body.game,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location
});

tournamentModel.updateOne({ _id: id }, updatedTournament, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }

    res.json({ success: true, msg: 'Success', updatedTournament });
})
}

//Delete
export function Delete(req, res, next){
let id = req.params.id
tournamentModel.remove({_id: id}, function(error){
    if(error){
        console.error(error);
        res.end(error);
    }

    res.json({success: true, msg: 'Delete Successful'});
})

}