const helpers = require('../../helpers/helpers');
const express = require('express');
const router = express.Router();

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

router.get('/:phoneNumber', (req, res) => {
    // Retrieve the subscriber identified by the provided phone number
    const phoneNumber = req.params.phoneNumber;
    
    if (helpers.isNumberInvalid(phoneNumber)) return res.status(400).json({ message: "Bad request. Only numbers are accepted. No alphabets and symbols." });

    for (let i = 0; i < subscribers.length; i++) {
        if (phoneNumber === subscribers[i].phoneNumber) {
            console.log('Matched!');
            return res.status(200).json(subscribers[i]);
        }
    }

    console.log('No match');
    return res.status(404).json({ message: "Phone number not found." });
})

router.put('/:phoneNumber', () => {
    // Add or update a subscriber identified by the provided phone number
})

router.delete('/:phoneNumber', (req, res) => {
    // Remove the subscriber identified by the phone number
    const phoneNumber = req.params.phoneNumber;

    if (helpers.isNumberInvalid(phoneNumber)) return res.status(400).json({ message: "Bad request. Only numbers are accepted. No alphabets and symbols." });

    for (let i = 0; i < subscribers.length; i++) {
        if (phoneNumber === subscribers[i].phoneNumber) {
            subscribers.splice(i, 1);
            return res.status(200).send(subscribers);
        }
    }

    console.log('No match');
    return res.status(404).json({ message: "Phone number not found." });
})

module.exports = router;