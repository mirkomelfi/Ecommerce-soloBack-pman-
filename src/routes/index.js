import routerCart from "./cart.js";
import routerProduct from "./product.js";
import routerSession from "./session.js";
import routerUsers from "./users.js";
import { Router } from "express";

const router = Router()

router.use('/api/users', routerUsers)
router.use('/api/session', routerSession)
router.use('/api/products', routerProduct)
router.use('/api/carts', routerCart)

router.use('*', (req, res) => {
    res.status(404).send({ error: "404 No se encuentra la pagina solicitada" })
})

export default router
