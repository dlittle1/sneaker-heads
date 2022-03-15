const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('users list')
})
app.listen(9000, () => {
  console.log('app is running on port 9000')
})
