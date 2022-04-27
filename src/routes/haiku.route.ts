import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {saveHaik, payment, getHaik} from '../controllers/haik.controller'

router.post('/', saveHaik)
router.post('/pay', payment)
router.get('/:id', getHaik)


export default router;