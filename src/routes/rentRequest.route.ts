import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {postRequest} from '../controllers/rentRequest.controller'

router.post('/', postRequest)


export default router;