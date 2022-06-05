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
 * -----------ENDPOINTS-------------
 */
app.use('/', require('./backend/routes/home'));
app.use('/ims/subscriber', require('./backend/routes/subscribers'));

/**
 * -----------SERVER-------------
 */
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})