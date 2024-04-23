import { Router } from "express";
import { findAll } from '../controllers/user.controller.js'
import authJWT from "../middlewares/authJWT.js";
const userRoute = Router()

// userRoute.use(authJWT)
userRoute.get('/', findAll)

export default userRoute