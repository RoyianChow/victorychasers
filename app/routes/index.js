import {Router } from 'express';
import {displayAboutPage, displayContactPage, displayHomePage, displayTournamentPage, displayViewTournamentPage} from '../controllers/index.js';

const router = Router();

router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);

router.get('/contact', displayContactPage);
router.get('/create-tournament', displayTournamentPage);
router.get('/view-tournament', displayViewTournamentPage);





export default router;