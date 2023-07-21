import ticketModel from "../models/MongoDB/ticketModel.js";

export const findTickets = async () => {

    try {
        const tickets = await ticketModel.find()
        return tickets
    } catch (error) {
        throw new Error(error)
    }
}


export const findTicketById = async (id) => {
    try {
        const ticket = await ticketModel.findById(id)
        return ticket
    } catch (error) {
        throw new Error(error)
    }
}

export const createTicket = async (cart,email) => {
    try {
        const tickets = await ticketModel.find()
        
        const cantTickets=tickets.length
        const products=cart.products
        let total=0

        products.forEach(product => (total= total+product.subtotal))

        const ticket={
            code: cantTickets+1,
            purchase_datetime: new Date(),//.toString()
            amount: total,
            purchaser: email
        }

        const newTicket = await ticketModel(ticket)
        
        await newTicket.save()
        return newTicket

    } catch (error) {
        throw new Error(error)
    }
}