import { Router } from 'express'
import { deleteInactiveUsers, getUsers } from "../controllers/user.js";
import { autenticateRolAdmin } from '../controllers/products.js';

const routerUsers = Router()

routerUsers.get('/', autenticateRolAdmin, getUsers)
routerUsers.delete('/',autenticateRolAdmin, deleteInactiveUsers)


export default routerUsers