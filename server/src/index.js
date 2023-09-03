const express = require('express')
const userRoutes = require('./routes/users')
const connectDb = require('./db/connection')
const app = express()
const cors = require("cors");
require('dotenv').config()

app.use(cors());

app.use(express.json())
app.use(userRoutes)

connectDb()
const port = process.env.PORT
 
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})