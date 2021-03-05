import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import HttpError from '../models/http-error.js'
import User from '../models/user-model.js'

const getUserFromDB = async (email) => {
  let user
  try {
    user = await User.findOne({ email: email })
  } catch (err) {
    console.log(err)
    return next(new HttpError(err._message, 500))
  }
  return user
}

// generate JWT
const generateJWT = (userId, email) => {
  if (!userId || !email) {
    return next(new HttpError('Bad data for JWT', 422))
  }
  try {
    const token = jwt.sign(
      { userId, email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
    return token

  } catch (err) {
    console.log(err);
    return next(new HttpError(err._message, 500))
  }
}

export const signup = async (req, res, next) => {
  // use express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Check ypur data', 422))
  }

  const { email, password } = req.body

  // check is driver already exists
  const fetchedUser = await getUserFromDB(email)
  if (fetchedUser) {
    return next(new HttpError('User already exists', 422))
  }

  // hash password
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    console.log(err)
    return next(new HttpError(err._message, 500))
  }

  const user = new User({
    email,
    password: hashedPassword
  })

  try {
    await user.save()
  } catch (err) {
    console.log(err)
    return next(new HttpError(err._message, 500))
  }

  // generate JWT
  const token = generateJWT(user.id, user.email)

  res.status(201).json({
    userId: user.id,
    email: user.email,
    token
  })
}

export const login = (req, res, next) => {
  // TODO: implement the logic

  res.status(200).json({
    msg: 'login'
  });
}
