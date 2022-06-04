require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

/**
 * -----------CONFIGURE EXPRESS MIDDLEWARE-------------
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());
 app.set('view engine', 'ejs');
 app.use(express.static('public'));
 

/**
 * -----------SERVER-------------
 */
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})