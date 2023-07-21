import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: Number, // el autoincrement no se hace aca, no?
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date, // no se si esta ok
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true,
    },

})

const ticketModel = model("Tickets", ticketSchema)

export default ticketModel