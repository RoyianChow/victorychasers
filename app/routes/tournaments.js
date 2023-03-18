import {Router} from 'express';
import { DisplayTournamentsAddPage, DisplayTournamentsEditPage, DisplayTournamentsList, ProcessTournamentsAddPage, ProcessTournamentsDelete, ProcessTournamentsEditPage } from '../controllers/tournaments.js';
import { AuthGuard } from '../utils/index.js';

const router = Router();

// C reate
router.get('/tournament-add', DisplayTournamentsAddPage);
router.post('/tournament-add', AuthGuard, ProcessTournamentsAddPage);
// R ead
router.get('/tournament-list', AuthGuard, DisplayTournamentsList);


// U pdate
router.get('/tournament-edit/:id',AuthGuard, DisplayTournamentsEditPage);
router.post('/tournament-edit/:id',AuthGuard, ProcessTournamentsEditPage);

// D elete
router.get('/tournament-delete/:id', AuthGuard,ProcessTournamentsDelete);

export default router; //