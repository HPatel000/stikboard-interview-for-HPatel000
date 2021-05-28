const { Router } = require('express')
const router = Router()
const User = require('../models/User')

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'user already exists' })
    }
    user = await User.create({ email, password })
    res.status(201).json({ user })
  } catch (err) {
    if (err.message === 'incorrect email') {
      res.status(400).json({ msg: 'That email is not valid' })
    }

    if (err.message === 'incorrect password') {
      res.status(400).json({ msg: 'That password is not valid' })
    }
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    res.status(200).json({ user })
  } catch (err) {
    if (err.message === 'incorrect email') {
      res.status(400).json({ msg: 'That email is not registered' })
    }
    if (err.message === 'incorrect password') {
      res.status(400).json({ msg: 'That password is incorrect' })
    }
  }
})

module.exports = router
