import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {saveHaik} from '../controllers/haik.controller'

router.post('/', saveHaik)


export default router;