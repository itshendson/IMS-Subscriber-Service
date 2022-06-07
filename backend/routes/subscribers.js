const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

/*
 * -----------DATA STORAGE-------------
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
        telemarketing: false,
      },
    },
  },
  {
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
  },
];

// Retrieve the subscriber identified by the provided phone number
router.get(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .isMobilePhone()
      .withMessage(
        "Only numbers and dashes are accepted. Example: 16041234567"
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

// Add or update a subscriber identified by the provided phone number
router.put("/:phoneNumber", () => {
  const phoneNumber = req.params.phoneNumber;

  for (let i = 0; i < subscribers.length; i++) {
    if (phoneNumber === subscribers[i].phoneNumber) {
      // Update existing subscriber
    }
  }

  // Add new subscriber
  return res.status(200).json({ message: "Subscriber created." });
});

// Remove the subscriber identified by the phone number.
router.delete(
  "/:phoneNumber",
  [
    check("phoneNumber")
      .isMobilePhone()
      .withMessage(
        "Only numbers and dashes are accepted. Example: 16041234567"
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
        return res.status(200).send({ message: "Phone number deleted." });
      }
    }

    console.log("No match");
    return res.status(404).json({ message: "Phone number not found." });
  }
);

module.exports = router;
