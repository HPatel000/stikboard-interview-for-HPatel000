const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000

const app = express()
app.use(express.json({ extended: true }))

mongoose
  .connect('mongodb://localhost:27017/spacex', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('data base connected')
    app.listen(port, () => console.log(`server started at port ${port}`))
  })
  .catch(err => console.log(err))
