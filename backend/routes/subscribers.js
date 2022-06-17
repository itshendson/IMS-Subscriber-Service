const { check, body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

/*
 * -----------DATA STORAGE MAP-------------
 */
const subscribers = new Map();

subscribers.set("16042946853", {
  phoneNumber: "16042946853",
  username: "Windrunner",
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
  status: "ACTIVE",
  features: {
    satelliteCalling: {
      provisioned: true,
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
        "Input must follows BC phone number format, including country code, area code, followed by 7 digits."
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
// Assumption: Do not allow phone number changes.
router.put(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .matches(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)
      .withMessage(
        "Input must follows BC phone number format, including country code, area code, followed by 7 digits."
      ),
    body("username")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters.")
      .matches(/^[a-zA-Z0-9_]*$/)
      .withMessage("Only alphanumeric characters accepted.")
      .escape(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters.")
      .trim()
      .escape(),
    body("status")
      .matches(/(ACTIVE|INACTIVE)/)
      .withMessage("Status must be either 'ACTIVE' or 'INACTIVE'."),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const phoneNumber = req.params.phoneNumber;

    const subscriber = {
      phoneNumber: req.body.phoneNumber,
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
        "Input must follows BC phone number format, including country code, area code, followed by 7 digits."
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
      return res.status(200).send({ message: "Subscriber deleted." });
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

module.exports = router;
