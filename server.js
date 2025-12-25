const express = require('express');
const app=express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'FrontEnd')));

require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const db=require('./db.js');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd','pages', 'index.html'));
});

const userRoutes = require('./Routes/userRoutes.js');
app.use('/user', userRoutes);


const candidateRoutes = require('./Routes/candidateRoutes.js');
app.use('/candidate', candidateRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});