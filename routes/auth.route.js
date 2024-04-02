import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
const authRoute = Router()

authRoute.post('/login', login)
authRoute.post('/register', register)

export default authRoute