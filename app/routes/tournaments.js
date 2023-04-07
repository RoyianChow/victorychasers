
import { Router } from "express";

import { displayAddPage, displayTournamentList, displayViewTournament, processAddPage, processDelete, processEditPage,displayEditPage,  } from "../controllers/tournaments.js";

const router = Router();

/* GET tournaments List page. READ */
router.get('/tournaments/list', displayTournamentList);

//  GET the Tournament Details page in order to add a new Tournament
router.get('/tournaments/add', displayAddPage);
// POST process the Tournament Details page and create a new Tournament - CREATE
router.post('/tournaments/add', processAddPage);

// GET the Tournament Details page in order to edit an existing Tournament
router.get('/tournaments/edit/:id', displayEditPage);

// POST - process the information passed from the details form and update the document
router.post('/tournaments/edit/:id', processEditPage);

// GET - process the delete by user id
router.get('/tournaments/delete/:id', processDelete);
// GET the Tournament Details page in order to edit an existing Tournament
router.get('/tournaments/view/:id', displayViewTournament);





export default router;