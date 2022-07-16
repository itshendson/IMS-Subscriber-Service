const message = document.getElementById("message-div");

const closeModal = () => {
  document.getElementById("modal-overlay").style.display = "none";

  // Reset modal input fields to blank on close
  document.getElementById("modal-number-display").textContent = "";
  document.getElementById("input-username").value = "";
  document.getElementById("input-password").value = "";
  document.getElementById("input-domain").value = "";
  document.getElementById("input-status").value = "";
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

export { closeModal, openModal, test };
