import { Router } from "express";
import { emptyCart, finalizarCompra, getCartById,getCarts,getCart, removeProductCart,addProductCart, addProductCartTESTCont, updateProductsCart } from "../controllers/cart.js";
import { autenticateRolUsr } from "../controllers/products.js";

const routerCart = Router()

//routerCart.get("/", getCarts)

routerCart.get("/", autenticateRolUsr,getCart)

routerCart.get("/:cid",getCartById)


routerCart.post("/product/:pid", autenticateRolUsr, addProductCartTESTCont) // agrega de a 1
routerCart.put("/product/:pid", autenticateRolUsr, addProductCart) // reemplaza la cantidad del producto ingresado por la nueva
routerCart.put("/", autenticateRolUsr, updateProductsCart) // reemplaza todas las cantidades de los productos ingresados por las nuevas
routerCart.post("/", autenticateRolUsr, finalizarCompra)


routerCart.delete("/product/:pid",autenticateRolUsr,removeProductCart)
routerCart.delete("/",autenticateRolUsr, emptyCart)

/*

no se si hacen falta xq generalmente esto va x body no x params y ya la cree en el user
routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)

*/


export default routerCart