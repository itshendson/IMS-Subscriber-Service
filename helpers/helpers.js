/*
 * Deprecated. No longer using this validation method. Replaced with the express-validator module.
 */
const isNumberInvalid = (phoneNumber) => {
  if (isNaN(phoneNumber)) return true;
  if (phoneNumber === undefined) return true;
  if (phoneNumber === null) return true;
  return false;
};

const reachTest = () => {
  console.log("Reached!");
};

exports.isNumberInvalid = isNumberInvalid;
exports.reachTest = reachTest;
