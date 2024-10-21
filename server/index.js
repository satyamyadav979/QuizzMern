
const express = require('express')
var cors = require('cors')

require('dotenv').config();

const dbConfig = require('./config/database')

const app = express()
app.use(cors())
app.use(express.json())





const PORT = process.env.PORT || 8080;


app.listen(PORT , ()=>{

    console.log(   `Server is running on port http://localhost:${PORT}`);
})

