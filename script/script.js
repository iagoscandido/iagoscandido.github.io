async function loadItems() {
  try {
    const response = await fetch("../data/items.json"); // Changed path
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Loaded items:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error loading items:", error);
    return [];
  }
}

async function renderItems() {
  const itemsData = await loadItems();
  const container = document.getElementById("items-container");

  if (!container) {
    console.error("Container element not found!");
    return;
  }

  container.innerHTML = "";

  if (!itemsData || itemsData.length === 0) {
    container.innerHTML = "<p>No items found</p>";
    return;
  }

  itemsData.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "desc-item";
    itemElement.innerHTML = `
      <h1 class="title">${item.title}</h1>
      <p class="short-desc">${item.shortDesc}</p>
      <div class="long-desc">${item.longDesc}</div>
    `;
    container.appendChild(itemElement);
  });
}

// Add event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  renderItems();

  document.querySelector(".search-bar").addEventListener("input", function (e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    document.querySelectorAll(".desc-item").forEach((item) => {
      const textContent = [
        item.querySelector(".title").textContent,
        item.querySelector(".short-desc").textContent,
        item.querySelector(".long-desc").textContent,
      ]
        .join(" ")
        .toLowerCase();

      item.style.display = textContent.includes(searchTerm) ? "block" : "none";
    });
  });
});
