import { Router } from "express";
import { autenticateRolAdmin, deleteProduct, updateProduct, addProduct, getProducts, getProductById,addMockingProducts} from "../controllers/products.js";


const routerProduct = Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProductById)

routerProduct.post("/mockingproducts", addMockingProducts)

routerProduct.post("/", autenticateRolAdmin, addProduct)
routerProduct.put("/:id", autenticateRolAdmin, updateProduct)
routerProduct.delete("/:id", autenticateRolAdmin, deleteProduct)



export default routerProduct