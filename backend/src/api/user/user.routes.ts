import express from 'express'
import { getUser, handleUserLogin } from './user.controller'

const router = express.Router()

router.get('/:id', getUser)
router.post('/login', handleUserLogin)


export const userRoutes = router