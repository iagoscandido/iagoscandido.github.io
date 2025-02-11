export function initThemeToggle() {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) {
    console.error("No element with id 'theme-toggle' found.");
    return;
  }

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button text based on mode
    if (document.body.classList.contains("dark-mode")) {
      this.textContent = "Light Mode";
    } else {
      this.textContent = "Dark Mode";
    }
  });
}
