import {Router} from 'express';
import { DisplayTournamentsAddPage, DisplayTournamentsEditPage, DisplayTournamentsList, ProcessTournamentsAddPage, ProcessTournamentsDelete, ProcessTournamentsEditPage } from '../controllers/tournaments.js';

const router = Router();


// C reate
router.get('/tournament-add', DisplayTournamentsAddPage);
router.post('/tournament-add', ProcessTournamentsAddPage);
// R ead
router.get('/tournament-list', DisplayTournamentsList);


// U pdate
router.get('/tournament-edit/:id', DisplayTournamentsEditPage);
router.post('/tournament-edit/:id', ProcessTournamentsEditPage);

// D elete
router.get('/tournament-delete/:id', ProcessTournamentsDelete);

export default router;