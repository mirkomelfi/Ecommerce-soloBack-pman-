import { Router } from "express";
import { createNewPassword, loginUser, passwordRecovery, registerUser, current,logoutUser } from "../controllers/session.js";

const routerSession = Router()

routerSession.post("/register", registerUser)
routerSession.post("/login", loginUser)
routerSession.get("/logout", logoutUser)
routerSession.get("/current", current)
routerSession.post("/passwordRecovery", passwordRecovery)
routerSession.post("/newPass", createNewPassword)
//crear loggout

export default routerSession