import { closeModal, openModal } from "./modal.js";

const message = document.getElementById("message-div")!;
const phoneNumberDisplay = document.getElementById("phone-number")!;
const usernameDisplay = document.getElementById("username")!;
const passwordDisplay = document.getElementById("password")!;
const domainDisplay = document.getElementById("domain")!;
const statusDisplay = document.getElementById("status")!;
const featureDisplay = document.getElementById("features")!;

// Event delegation for the buttons: "Create/Modify," "Delete," and "Search"
document
  .getElementById("button-container")!
  .addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target as Element;
    let phoneNumberInput = (document.getElementById("input-phone") as HTMLInputElement).value;

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
      (document.getElementById("input-phone") as HTMLInputElement).value = "";
      message.textContent = "";
    }

    // Sanitize phone number
    phoneNumberInput = phoneNumberInput.replaceAll("-", "");

    // Delegate functions to buttons
    switch (target.id) {
      case "search-button":
        searchSubscriber(parseInt(phoneNumberInput));
        break;
      case "delete-button":
        deleteSubscriber(parseInt(phoneNumberInput));
        break;
      case "create-modify-button":
        openModal(phoneNumberInput);
        break;
    }
  });

// Event delegation for closing modal
document.getElementById("modal-overlay")!.addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target as Element;

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

const searchSubscriber = async (phoneNumberInput: number): Promise<void> => {
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

const deleteSubscriber = async (phoneNumberInput: number): Promise<void> => {
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

const createModifySubscriber = async (): Promise<void> => {
  const phoneNumberInput = document.getElementById(
    "modal-number-display"
  )!.textContent;

  // Create options for request
  const options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumberInput,
      username: (document.getElementById("input-username") as HTMLInputElement).value,
      password: (document.getElementById("input-password") as HTMLInputElement).value,
      domain: (document.getElementById("input-domain") as HTMLInputElement).value,
      status: (document.getElementById("input-status") as HTMLInputElement).value,
      features: "none",
    }),
  };

  // Reset modal inputs on frontend
  (document.getElementById("input-username") as HTMLInputElement).value = "";
  (document.getElementById("input-password") as HTMLInputElement).value = "";
  (document.getElementById("input-domain") as HTMLInputElement).value = "";
  (document.getElementById("input-status") as HTMLInputElement).value = "";

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

const clearDisplay = (): void => {
  phoneNumberDisplay.textContent = "";
  usernameDisplay.textContent = "";
  passwordDisplay.textContent = "";
  domainDisplay.textContent = "";
  statusDisplay.textContent = "";
  featureDisplay.textContent = "";
};
