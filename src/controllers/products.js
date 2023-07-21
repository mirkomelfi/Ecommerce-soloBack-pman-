import { createUser, findUserByEmail,findUserById } from "../services/UserServices.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createProduct, modifyProduct, removeProduct, findProducts, findProductById,createMockingProducts} from "../services/ProductServices.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";


export const addMockingProducts = async (req,res) => {
    //Errores de datos a enviar a mi BDD
    try {
        const mockingproducts = createMockingProducts()
        if (mockingproducts){
            return res.status(200).json({
                message: "Productos añadidos"
            })
        }
        res.status(200).json({
            message: "No se pudieron añadir los productos"
        })
    } catch (error) {
        throw new Error(error)
    }
}


export const addProduct = async (req,res) => {

    const {title,description,code,price,status,stock,category,thumbnails}= req.body
    //Errores de datos a enviar a mi BDD
    try {
/*
        if (!title||!description||!code||!price||!stock||!category||!thumbnails){
            /*CustomError.createError({
                name:"Product creation error",
                cause:generateProductErrorInfo ({title,description,code,price,status,stock,category,thumbnails}),
                message:"Error Trying to create Product",
                code:EErrors.INVALID_TYPES_ERROR
            })
        }*/

        const newProduct = await createProduct(req.body)
        if (typeof newProduct==='object'){
            res.status(200).json({
                message: "Producto añadido correctamente"
            })
        }else{
            return res.status(400).json({
                message: newProduct
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    
    try {
        const products= await findProducts()

        const newProduct = await modifyProduct(id, product, products)

        if (typeof newProduct==='object') {
            return res.status(200).json({
                message: "Producto actualizado"
            })
        }else{
            res.status(400).json({
                message: newProduct
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}


export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!id){
        req.logger.warning("No se ingreso un id")
    }

    try {

        const products= await findProducts()

        const product = await removeProduct(id,products)
        
        if (product!=-1) {
            return res.status(200).json({
                message: "Producto eliminado"
            })
        }else{
            res.status(200).json({
                message: "Producto no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const autenticateRolUsr = async (req, res, next) => {
    try {
        
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        //El token existe, asi que lo valido
            //console.log(req.headers.authorization)
            //console.log(req.signedCookies)
           // console.log(req.cookies.jwt)
           // console.log (req.cookies['jwt'])
            //console.log (req.headers.authorization)
            const token = req.cookies.jwt//||req.headers.authorization;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log("token",token)
                    // Token no valido
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    console.log("userBDD en autent rol",userBDD)
                    // Token valido
                    req.user = userBDD
                    const rol=userBDD.rol
                    if (rol==="User"){
                        next()
                    }else{
                        return res.status(400).send("Solo Rol usuario tiene acceso")
                    }

                }
            })

        })(req, res, next)
    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const autenticateRolAdmin = async (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        //El token existe, asi que lo valido
            const token = req.cookies.jwt//||req.headers.authorization;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    // Token no valido
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    // Token valido
                    req.user = userBDD
                    const rol=userBDD.rol
                    if (rol==="Admin"){
                        next()
                    }else{
                        return res.status(200).send("Solo Rol Admin tiene acceso")
                    }

                }
            })

        })(req, res, next)
    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const getProducts = async (req, res) => {
    try {
        
        const products = await findProducts(req.query)
        if (products.length!==0){
            res.status(200).send(products) 
        }else{
            res.status(400).send("No hay productos")
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

export const getProductById = async (req, res) => {
    const {id}=req.params
    try {
        const product = await findProductById(id)
        if (product!=-1){
            if (!product.title||!product.description||!product.code||!product.price||!product.status||!product.stock||!product.category||!product.thumbnails){
                req.logger.warning(`Faltan propiedades del producto: ${product}`)
            }
            res.status(200).send(product) 
        }else{
            res.status(400).send("Producto no existente")
        }
      

    } catch (error) {
        res.status(500).send(error)
    }

}