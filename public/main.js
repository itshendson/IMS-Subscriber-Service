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
        createModifySubscriber(phoneNumberInput);
        break;
    }
  });

document.getElementById("modal-overlay").addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target;

  // Delegate functions for closing modal to buttons
  switch (target.id) {
    case "modal-close":
      closeModal();
      break;
    case "modal-overlay":
      closeModal();
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

const createModifySubscriber = async (phoneNumberInput) => {
  document.getElementById("modal-overlay").style.display = "block";
};

const closeModal = () => {
  document.getElementById("modal-overlay").style.display = "none";
};

clearDisplay = () => {
  phoneNumberDisplay.textContent = "";
  usernameDisplay.textContent = "";
  passwordDisplay.textContent = "";
  domainDisplay.textContent = "";
  statusDisplay.textContent = "";
  featureDisplay.textContent = "";
};
