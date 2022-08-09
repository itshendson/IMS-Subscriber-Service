const message = document.getElementById("message-div");

const closeModal = () => {
  document.getElementById("modal-overlay")!.style.display = "none";

  // Reset modal input fields to blank on close
  document.getElementById("modal-number-display")!.textContent = "";
  (document.getElementById("input-username") as HTMLInputElement).value = "";
  (document.getElementById("input-password") as HTMLInputElement).value = "";
  (document.getElementById("input-domain") as HTMLInputElement).value = "";
  (document.getElementById("input-status") as HTMLInputElement).value = "";
};

const openModal = async (phoneNumberInput: string) => {
  document.getElementById("modal-overlay")!.style.display = "block";
  document.getElementById("modal-number-display")!.textContent =
    phoneNumberInput;

  // Fill in modal input fields
  const response = await fetch(`/ims/subscriber/${phoneNumberInput}`);
  const responseJSON = await response.json();

  if (response.status === 200) {
    (document.getElementById("input-username") as HTMLInputElement).value = responseJSON.username;
    (document.getElementById("input-domain") as HTMLInputElement).value = responseJSON.domain;
    (document.getElementById("input-password") as HTMLInputElement).value = "******";
    (document.getElementById("input-status") as HTMLInputElement).value = responseJSON.status;
  } else {
    message!.textContent = "";
  }
};

export { closeModal, openModal };
