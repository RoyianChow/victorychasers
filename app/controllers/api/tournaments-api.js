import tournamentsModel from '../../models/tournaments.js';
import playersModel from '../../models/player-schema.js';

//R ead Operations
export function GetList(req, res, next){
    tournamentsModel.find(function (error, tournamentCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(tournamentCollection);
        
        res.json({success: true, msg: 'Success', tournaments: tournamentCollection, user: req.user})       
    })
}
//R ead Operations
export function GetPlayerList(req, res, next){
    let id = req.params.id;
    playersModel.find.findById(id,function (error, playerCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(playerCollection);
        
        res.json({success: true, msg: 'Success', players: playerCollection, user: req.user})       
    })
}

export function Get(req, res, next){
    let id = req.params.id;

    tournamentsModel.findById(id, function (error, tournament){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(tournament);
        
        res.json({success: true, msg: 'Success', tournament, user: req.user})       
    })
}
export function playerGet(req, res, next){
    let id = req.params.id;

    playersModel.findById(id, function (error, player){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(player);
        
        res.json({success: true, msg: 'Success', player, user: req.user})       
    })
}

//C reate
export function Add(req, res, next){
    let newTournament = tournamentsModel({
       ...req.body
    });

    tournamentsModel.create(newTournament,function(error, tournament){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newTournament, user: req.user})
    })
}
//C reate
export function playerAdd(req, res, next){
    let newPlayer = playersModel({
       ...req.body
    });

    playersModel.create(newPlayer,function(error, player){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newPlayer, user: req.user})
    })
}

//U pdate
export function Edit(req, res, next){
    let id = req.params.id;

    let updatedTournament = new tournamentsModel({
        "_id": id,
        ...req.body
    });

    tournamentsModel.updateOne({ _id: id }, updatedTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.json({ success: true, msg: 'Success', updatedTournament });
    })
}
//U pdate
export function playerEdit(req, res, next){
    let id = req.params.id;

    let updatedPlayer = new playersModel({
        "_id": id,
        ...req.body
    });

    playersModel.updateOne({ _id: id }, updatedPlayer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.json({ success: true, msg: 'Success', updatedPlayer });
    })
}


//D elete
export function Delete(req, res, next){
    let id = req.params.id

    tournamentsModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Delete Successfull'});
    })
}

//D elete
export function playerDelete(req, res, next){
    let id = req.params.id

    playersModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Delete Successfull'});
    })
}