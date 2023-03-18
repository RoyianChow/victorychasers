// modules required for routing
//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
import { Router } from "express";

import { displayAddPage, displayTournamentList, displayEditPage, processAddPage, processDelete, processEditPage } from "../controllers/tournaments.js";

const router = Router();

/* GET tournaments List page. READ */
router.get('/tournaments/list', displayTournamentList);

//  GET the Book Details page in order to add a new Book
router.get('/tournaments/add', displayAddPage);
// POST process the Book Details page and create a new Book - CREATE
router.post('/tournaments/add', processAddPage);

// GET the Book Details page in order to edit an existing Book
router.get('/tournaments/edit/:id', displayEditPage);

// POST - process the information passed from the details form and update the document
router.post('/tournaments/edit/:id', processEditPage);

// GET - process the delete by user id
router.get('/tournaments/delete/:id', processDelete);


export default router;