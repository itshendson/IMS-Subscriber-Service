const { check, validationResult } = require("express-validator");
const helpers = require("../../helpers/helpers");
const express = require("express");
const router = express.Router();

/**
 * -----------DATA STORAGE-------------
 * Assumption: Phone numbers are 11 digits long.
 */
let subscribers = [
  {
    phoneNumber: "18675181010",
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
  },
  {
    phoneNumber: "17781234567",
    username: "HomerSimpsons",
    password: "password123",
    domain: "ims.mnc660.mcc302.3gppnetwork.org",
    status: "ACTIVE",
    features: {
      callForwardNoReply: {
        provisioned: true,
        destination: "tel:+18674567892",
      },
    },
  },
];

router.get(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .isMobilePhone()
      .withMessage(
        "Phone number can only include numbers. No alphabets or symbols. Example: 16041234567"
      )
      .isLength({ min: 11, max: 11 })
      .withMessage(
        "Phone numbers must be 11 digits, including Country Code and Area Code. Example: 16041234567"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const phoneNumber = req.params.phoneNumber;

    for (let i = 0; i < subscribers.length; i++) {
      if (phoneNumber === subscribers[i].phoneNumber) {
        console.log("Matched!");
        return res.status(200).json(subscribers[i]);
      }
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

router.put("/:phoneNumber", () => {
  // Add or update a subscriber identified by the provided phone number
  const phoneNumber = req.params.phoneNumber;

  for (let i = 0; i < subscribers.length; i++) {
    if (phoneNumber === subscribers[i].phoneNumber) {
      // Update existing subscriber
    }
  }

  // Add new subscriber
  return res.status(200).json({ message: "Subscriber created." });
});

router.delete(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .isMobilePhone()
      .withMessage(
        "Phone number can only include numbers. No alphabets or symbols. Example: 16041234567"
      )
      .isLength({ min: 11, max: 11 })
      .withMessage(
        "Phone numbers must be 11 digits, including Country Code and Area Code. Example: 16041234567"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const phoneNumber = req.params.phoneNumber;

    for (let i = 0; i < subscribers.length; i++) {
      if (phoneNumber === subscribers[i].phoneNumber) {
        subscribers.splice(i, 1);
        return res.status(200).send(subscribers);
      }
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

module.exports = router;
