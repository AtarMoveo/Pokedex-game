import { Request, Response } from "express"
import { userService } from "./user.service"

export async function getUser(req: Request, res: Response) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        res.status(400).send({ err: 'Failed to get user' })
    }
}

export async function handleUserLogin(req: Request, res: Response): Promise<void> {
    
    try {
        const {cognitoUser} = req.body
        const user = await userService.saveUser(cognitoUser)
        res.send(user)
    } catch (err) {
        res.status(400).send({ err: 'Failed to sign up user' })
    }
}