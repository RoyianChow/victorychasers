import tournamentsModel from '../../models/tournaments.js';

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


//C reate
export function Add(req, res, next){
    let newtournament = tournamentsModel({
       ...req.body
    });

    tournamentsModel.create(newtournament,function(error, tournament){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newtournament, user: req.user})
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