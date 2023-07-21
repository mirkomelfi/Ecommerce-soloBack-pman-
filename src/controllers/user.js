import { findUsers, createUser, deleteUsers } from "../services/UserServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteInactiveUsers = async (req, res) => {
    try {
        const users = await findUsers()
        const deletedUsers= await deleteUsers(users)
        
        if (deletedUsers.length!=0){
            res.status(200).send({
                message: "Usuarios eliminados",
                usuarios_eliminados: deletedUsers
            })
        }else{
            res.status(400).send({
                message: "No hay usuarios para eliminar"
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}




