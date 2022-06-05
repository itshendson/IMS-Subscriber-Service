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
    return (message.textContent = "Phone number is required.");
  } else if (!phoneNumberInput.match(/^(\d+-?)+\d+$/)) {
    return (message.textContent = "Numbers and dashes only.");
  } else {
    document.getElementById("input-phone").value = "";
    message.textContent = "";
  }

  // Sanitize phone number
  phoneNumberInput = phoneNumberInput.replaceAll("-", "");

  // GET request to server
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`);
  const responseJSON = await response.json();
  console.log(responseJSON);

  // Display data to front end
  phoneNumberDisplay.textContent = responseJSON.phoneNumber;
  usernameDisplay.textContent = responseJSON.username;
  passwordDisplay.textContent = responseJSON.password;
  domainDisplay.textContent = responseJSON.domain;
  statusDisplay.textContent = responseJSON.status;
  featureDisplay.textContent = responseJSON.features;
});
