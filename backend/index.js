const express = require('express')
const app = express()
const cors = require("cors")
const sendEmailController = require("./controllers/emailController")
const ConDB = require("./DB/ConDB.js")
const port = process.env.PORT || 3000
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.post("/", sendEmailController)

ConDB()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})