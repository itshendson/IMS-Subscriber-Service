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
    }
]

/**
 * -----------ENDPOINTS-------------
 */
app.get('/ims/subscriber/:phoneNumber', (req, res) => {
    // Retrieve the subscriber identified by the provided phone number
    const phoneNumber = req.params.phoneNumber;

    for (let i = 0; i < subscribers.length; i++) {
        if (phoneNumber === subscribers[i].phoneNumber) {
            console.log('Matched!');
            res.status(200).send(subscribers[i]);
        } else {
            console.log('No match')
            res.status(404).json({ message: "Phone number not found." })
        }
    }
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