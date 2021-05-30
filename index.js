const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')

const port = process.env.PORT || 5000

const app = express()
app.use(express.json({ extended: true }))

// connect to mongodb
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('data base connected')
    app.listen(port, () => console.log(`server started at port ${port}`))
  })
  .catch(err => console.log(err))

// routes
app.use('/auth', require('./routes/authRoute'))

// for production
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
