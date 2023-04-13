import { Router } from "express";
import { Add, Delete, Edit, Get, GetList,playerAdd,playerGet,GetPlayerList } from "../../controllers/api/tournaments-api.js";
//import movies controller operations later

const router = Router();

// HTTP Verbs GET, POST, PUT, DELETE
// REST API Methodology
router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

router.get('/view/:id', GetPlayerList);
router.get('/:id', playerGet);
router.post('/player/:id', playerAdd);
//router.put('/player', playerEdit);
//router.delete('/delete/:id', playerDelete);

export default router;