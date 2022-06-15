const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

/*
 * -----------DATA STORAGE MAP-------------
 * Assume phone numbers worldwide
 */
const subscribers = new Map();

subscribers.set("16041112222", {
  phoneNumber: "16041112222",
  username: "16045906403",
  password: "p@ssw0rd!",
  domain: "ims.mnc660.mcc302.3gppnetwork.org",
  status: "ACTIVE",
  features: {
    callForwardNoReply: {
      provisioned: true,
      destination: "tel:+18675182800",
    },
  },
});

subscribers.set("17781234567", {
  phoneNumber: "17781234567",
  username: "HomerSimpson",
  password: "chunkylover53",
  domain: "ims.mnc660.mcc302.3gppnetwork.org",
  status: "INACTIVE",
  features: {
    callForwardNoReply: {
      provisioned: false,
    },
  },
});

// Retrieve the subscriber identified by the provided phone number
router.get(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .matches(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)
      .withMessage(
        "Phone number must follow BC phone number format including country code (1) and area code (604, 250 236, or 778). Example: 1-778-123-4567"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const phoneNumber = req.params.phoneNumber;

    if (subscribers.has(phoneNumber)) {
      console.log("Matched!");
      return res.status(200).json(subscribers.get(phoneNumber));
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

// Add or update a subscriber identified by the provided phone number
router.put(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .matches(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)
      .withMessage(
        "Input must follows BC phone number format, including country code, area code, followed by 7 digits."
      ),
  ],
  (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    const subscriber = {
      username: req.body.username,
      password: req.body.password,
      domain: req.body.domain,
      status: req.body.status,
      features: req.body.features,
    };

    subscribers.set(phoneNumber, subscriber);

    res.status(200).json({ message: "Subscriber created or modified." });
  }
);

// Remove the subscriber identified by the phone number.
router.delete(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .matches(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)
      .withMessage(
        "Phone number must follow BC phone number format including country code (1) and area code (604, 250 236, or 778). Example: 1-778-123-4567"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const phoneNumber = req.params.phoneNumber;

    if (subscribers.has(phoneNumber)) {
      console.log("Matched!");
      subscribers.delete(phoneNumber);
      return res.status(200).send({ message: "Phone number deleted." });
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

module.exports = router;
