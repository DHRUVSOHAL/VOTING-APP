const express = require('express');
const app=express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const db=require('./db.js');
const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routes/userRoutes.js');
app.use('/user', userRoutes);


const candidateRoutes = require('./Routes/candidateRoutes.js');
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});