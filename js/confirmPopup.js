/**
 * Custom Confirm Popup
 * A reusable confirm popup with modern styling and animations
 */

/**
 * Show the confirm popup with custom title and message
 * @param {string} title - The title of the popup
 * @param {string} message - The message to display
 * @param {function} onConfirm - Callback function to execute when confirm is clicked
 */
function showConfirm(title, message, onConfirm) {
  // Set the popup content
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupMessage").textContent = message;

  // Store the callback function
  let confirmCallback = onConfirm;

  // Update confirm button event
  document.getElementById("confirmBtn").onclick = function () {
    hideConfirm();

    if (typeof confirmCallback === "function") {
      confirmCallback();
    }
  };

  // Show the popup with animation
  const overlay = document.getElementById("confirmPopupOverlay");
  overlay.classList.add("active");

  // Prevent body scrolling when popup is open
  document.body.style.overflow = "hidden";
}

/**
 * Hide the confirm popup
 */
function hideConfirm() {
  const overlay = document.getElementById("confirmPopupOverlay");

  // Add transition for fade-out effect
  overlay.classList.remove("active");

  // Reset body scrolling
  document.body.style.overflow = "";

  // Clear the callback function
  confirmCallback = null;
}

/**
 * Close popup when clicking outside the popup container
 */
document
  .getElementById("confirmPopupOverlay")
  .addEventListener("click", function (event) {
    // If the user clicks directly on the overlay (not on the popup content)
    if (event.target === this) {
      hideConfirm();
    }
  });

/**
 * Close popup with Escape key
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideConfirm();
  }
});
