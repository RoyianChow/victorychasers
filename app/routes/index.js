import {Router } from 'express';
import {displayAboutPage, displayContactPage, displayHomePage, displayProjectsPage, displayServicesPage,displayTournamentPage, displayViewTournamentPage,displayLoginPage} from '../controllers/index.js';

const router = Router();

router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/services', displayServicesPage);
router.get('/projects', displayProjectsPage);
router.get('/contact', displayContactPage);
router.get('/create-tournament', displayTournamentPage);
router.get('/view-tournament', displayViewTournamentPage);
router.get('/login', displayLoginPage);




export default router;