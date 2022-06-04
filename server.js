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
app.get('/ims/subscriber/:phoneNumber', () => {
    // Retrieve the subscriber identified by the provided phone number
})

app.put('/ims/subscriber/:phoneNumber', () => {
    // Add or update a subscriber identified by the provided phone number
})

app.delete('/ims/subscriber/:phoneNumber', () => {
    // Remove the subscriber identified by the phone number
})


/**
 * -----------SERVER-------------
 */
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})