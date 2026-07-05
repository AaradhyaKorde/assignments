const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("Server is running");
  });
  
app.use("/users", userRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})