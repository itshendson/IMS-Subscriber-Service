require('dotenv').config();
const helpers = require('./helpers/helpers');
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const help = require('nodemon/lib/help');

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
 * -----------DATA STORAGE-------------
 */
 let subscribers = [
    {
        "phoneNumber": "18675181010",
        "username": "16045906403",
        "password": "p@ssw0rd!",
        "domain": "ims.mnc660.mcc302.3gppnetwork.org",
        "status": "ACTIVE",
        "features": {
            "callForwardNoReply": {
            "provisioned": true,
            "destination": "tel:+18675182800"
             }
        }
    },
    {
        "phoneNumber": "1111111",
        "username": "16045906403",
        "password": "p@ssw0rd!",
        "domain": "ims.mnc660.mcc302.3gppnetwork.org",
        "status": "ACTIVE",
        "features": {
            "callForwardNoReply": {
            "provisioned": true,
            "destination": "tel:+18675182800"
             }
        }
    }
]

/**
 * -----------ENDPOINTS-------------
 */
app.get('/ims/subscriber/:phoneNumber', (req, res) => {
    // Retrieve the subscriber identified by the provided phone number
    const phoneNumber = req.params.phoneNumber;
    
    if (helpers.isNumberInvalid(phoneNumber)) return res.status(400).json({ message: "Bad request. Only numbers are accepted. No alphabets and symbols." });

    for (let i = 0; i < subscribers.length; i++) {
        if (phoneNumber === subscribers[i].phoneNumber) {
            console.log('Matched!');
            return res.status(200).send(subscribers[i]);
        }
    }
    
    console.log('No match');
    return res.status(404).json({ message: "Phone number not found." });
})

app.put('/ims/subscriber/:phoneNumber', () => {
    // Add or update a subscriber identified by the provided phone number
})

app.delete('/ims/subscriber/:phoneNumber', (req, res) => {
    // Remove the subscriber identified by the phone number
    if (helpers.isNumberInvalid(phoneNumber)) return res.status(400).json({ message: "Bad request. Only numbers are accepted. No alphabets and symbols." });
    
})


/**
 * -----------SERVER-------------
 */
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})