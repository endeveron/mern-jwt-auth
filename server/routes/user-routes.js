import express from 'express'
import { body } from 'express-validator'

import {
  signup,
  login
} from '../controllers/user-controllers.js'

const userRoutes = express.Router()

userRoutes.post('/signup',
  [
    body('email')
      .normalizeEmail()
      .isEmail(),
    body('password')
      .isLength({ min: 6 })
  ],
  signup
)

userRoutes.post('/login', login)

export default userRoutes