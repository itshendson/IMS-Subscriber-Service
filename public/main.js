const searchButton = document.getElementById("search-button");
const message = document.getElementById("message-div");
const phoneNumberDisplay = document.getElementById("phone-number");
const usernameDisplay = document.getElementById("username");
const passwordDisplay = document.getElementById("password");
const domainDisplay = document.getElementById("domain");
const statusDisplay = document.getElementById("status");
const featureDisplay = document.getElementById("features");

searchButton.addEventListener("click", async () => {
  event.preventDefault();
  let phoneNumberInput = document.getElementById("input-phone").value;

  // Validate phone number
  if (phoneNumberInput.length < 1) {
    clearDisplay();
    return (message.textContent = "Phone number is required.");
    // } else if (!phoneNumberInput.match(/^(\d*-?)+\d+$/)) {
    //   clearDisplay();
    //   return (message.textContent = "Numbers and single dashes only.");
  } else if (!phoneNumberInput.match(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)) {
    clearDisplay();
    return (message.textContent =
      "Phone number must follow BC phone number format including country code (1) and area code (604, 250 236, or 778). Example: 1-778-123-4567");
  } else {
    document.getElementById("input-phone").value = "";
    message.textContent = "";
  }

  // Sanitize phone number
  phoneNumberInput = phoneNumberInput.replaceAll("-", "");

  // GET request to server
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`);
  const responseJSON = await response.json();

  // Handle response success/failure
  if (response.status === 200) {
    phoneNumberDisplay.textContent = responseJSON.phoneNumber;
    usernameDisplay.textContent = responseJSON.username;
    passwordDisplay.textContent = "******"; //responseJSON.password;
    domainDisplay.textContent = responseJSON.domain;
    statusDisplay.textContent = responseJSON.status;

    const featuresList = JSON.stringify(responseJSON.features)
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "")
      .replaceAll(",", ", ");
    featureDisplay.textContent = featuresList;
  } else {
    return (message.textContent = "Phone number not found.");
  }
});

clearDisplay = () => {
  phoneNumberDisplay.textContent = "";
  usernameDisplay.textContent = "";
  passwordDisplay.textContent = "";
  domainDisplay.textContent = "";
  statusDisplay.textContent = "";
  featureDisplay.textContent = "";
};
