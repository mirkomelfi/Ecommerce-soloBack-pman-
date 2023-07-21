import { Schema, model } from "mongoose";

const cartSchema = new Schema({
   /* cartNumber:{
        type: Number,
        unique: true
    },*/
    
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})


const cartModel = model("Carts", cartSchema)

export default cartModel