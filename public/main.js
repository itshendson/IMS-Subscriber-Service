const message = document.getElementById("message-div");
const phoneNumberDisplay = document.getElementById("phone-number");
const usernameDisplay = document.getElementById("username");
const passwordDisplay = document.getElementById("password");
const domainDisplay = document.getElementById("domain");
const statusDisplay = document.getElementById("status");
const featureDisplay = document.getElementById("features");

// Event delegation for the buttons: "Create/Modify," "Delete," and "Search"
document
  .getElementById("button-container")
  .addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target;
    let phoneNumberInput = document.getElementById("input-phone").value;

    // Validate phone number
    if (phoneNumberInput.length < 1) {
      clearDisplay();
      return (message.textContent = "Phone number is required.");
    } else if (
      !phoneNumberInput.match(/^1-?(250|604|236|778)-?\d{3}-?\d{4}$/)
    ) {
      clearDisplay();
      return (message.textContent =
        "Input must follows BC phone number format, including country code, area code, followed by 7 digits.");
    } else {
      document.getElementById("input-phone").value = "";
      message.textContent = "";
    }

    // Sanitize phone number
    phoneNumberInput = phoneNumberInput.replaceAll("-", "");

    // Delegate functions to buttons
    switch (target.id) {
      case "search-button":
        searchSubscriber(phoneNumberInput);
        break;
      case "delete-button":
        deleteSubscriber(phoneNumberInput);
        break;
      case "create-modify-button":
        openModal(phoneNumberInput);
        break;
    }
  });

// Event delegation for closing modal
document.getElementById("modal-overlay").addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target;

  // Delegate functions for closing modal
  switch (target.id) {
    case "modal-close":
      closeModal();
      break;
    case "modal-overlay":
      closeModal();
      break;
    case "confirm-create-modify-button":
      createModifySubscriber();
      break;
  }
});

const searchSubscriber = async (phoneNumberInput) => {
  // GET request to server
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`);
  const responseJSON = await response.json();

  // Handle response success/failure
  if (response.status === 200) {
    phoneNumberDisplay.textContent = responseJSON.phoneNumber;
    usernameDisplay.textContent = responseJSON.username;
    passwordDisplay.textContent = "******";
    domainDisplay.textContent = responseJSON.domain;
    statusDisplay.textContent = responseJSON.status;

    const featuresList = JSON.stringify(responseJSON.features)
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "")
      .replaceAll(",", ", ");
    featureDisplay.textContent = featuresList;
  } else {
    return (message.textContent = responseJSON.message);
  }
};

const deleteSubscriber = async (phoneNumberInput) => {
  // Delete request to backend
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`, {
    method: "DELETE",
  });
  const responseJSON = await response.json();

  if (response.status === 200) {
    clearDisplay();
    message.textContent = responseJSON.message;
  } else {
    return (message.textContent = responseJSON.message);
  }
};

const createModifySubscriber = async () => {
  const phoneNumberInput = document.getElementById(
    "modal-number-display"
  ).textContent;

  // Create options for request
  options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumberInput,
      username: document.getElementById("input-username").value,
      password: document.getElementById("input-password").value,
      domain: document.getElementById("input-domain").value,
      status: document.getElementById("input-status").value,
      features: "none",
    }),
  };

  // Reset modal inputs on frontend
  document.getElementById("input-username").value = "";
  document.getElementById("input-password").value = "";
  document.getElementById("input-domain").value = "";
  document.getElementById("input-status").value = "";

  // Make request and handle response
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`, options);
  const responseJSON = await response.json();
  if (response.status === 200) {
    message.textContent = responseJSON.message;
  } else if (response.status === 400) {
    message.textContent = responseJSON.errors[0].msg;
  }

  // Reset frontend
  closeModal();
  clearDisplay();
};

const openModal = async (phoneNumberInput) => {
  document.getElementById("modal-overlay").style.display = "block";
  document.getElementById("modal-number-display").textContent =
    phoneNumberInput;

  // Fill in modal input fields
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`);
  const responseJSON = await response.json();

  if (response.status === 200) {
    document.getElementById("input-username").value = responseJSON.username;
    document.getElementById("input-password").value = "******";
    document.getElementById("input-domain").value = responseJSON.domain;
    document.getElementById("input-status").value = responseJSON.status;
  } else {
    message.textContent = "";
  }
};

const closeModal = () => {
  document.getElementById("modal-overlay").style.display = "none";

  // Reset modal input fields to blank on close
  document.getElementById("modal-number-display").textContent = "";
  document.getElementById("input-username").value = "";
  document.getElementById("input-password").value = "";
  document.getElementById("input-domain").value = "";
  document.getElementById("input-status").value = "";
};

clearDisplay = () => {
  phoneNumberDisplay.textContent = "";
  usernameDisplay.textContent = "";
  passwordDisplay.textContent = "";
  domainDisplay.textContent = "";
  statusDisplay.textContent = "";
  featureDisplay.textContent = "";
};
