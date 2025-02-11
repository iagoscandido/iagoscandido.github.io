import(createItemElement);
const SELECTORS = {
  container: "#items-container",
  searchBar: ".search-bar",
  item: ".item",
  title: ".title",
  transTitle: ".trans-title",
  shortDesc: ".short-desc",
  fullDesc: ".full-desc",
  tag: ".tag",
};

const MESSAGES = {
  noItems: "<p>No items found</p>",
  containerNotFound: "Container element not found!",
  loadError: "Error loading items:",
};

const DATA_URL = "../data/items.json";

// Data Loading
async function loadItems() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`${MESSAGES.loadError} ${error}`);
    return [];
  }
}

// DOM Creation
function createItemElement(item) {
  const { title, transTitle, shortDesc, fullDesc, tag } = item;
  const element = document.createElement("div");
  element.classList.add("item");

  element.innerHTML = `
    <h1 class="title">
      ${title}
      <span class="trans-title"> (${transTitle}) </span>
      <span class="tag">${tag}</span>
    </h1>
    <p class="short-desc">${shortDesc}</p>
    <div class="full-desc">${fullDesc}</div>
  `;

  // Combine searchable text into one lowercased string and store it in a data attribute
  element.dataset.searchable =
    `${title} ${transTitle} ${shortDesc} ${fullDesc} ${tag}`.toLowerCase();

  // Toggle expand/focus effect on click
  element.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event bubbling to the document
    if (element.classList.contains("expanded")) {
      element.classList.remove("expanded");
    } else {
      // Remove expanded state from any other items
      document
        .querySelectorAll(SELECTORS.item)
        .forEach((el) => el.classList.remove("expanded"));
      element.classList.add("expanded");
    }
  });

  return element;
}

// Rendering
async function renderItems() {
  const container = document.querySelector(SELECTORS.container);
  if (!container) {
    console.error(MESSAGES.containerNotFound);
    return;
  }

  try {
    const itemsData = await loadItems();
    if (itemsData.length) {
      const fragment = document.createDocumentFragment();
      itemsData.forEach((item) =>
        fragment.appendChild(createItemElement(item))
      );
      container.innerHTML = "";
      container.appendChild(fragment);
    } else {
      container.innerHTML = MESSAGES.noItems;
    }
  } catch (error) {
    container.innerHTML = MESSAGES.noItems;
  }
}

// Search Functionality
function handleSearch(event) {
  const searchTerm = event.target.value.trim().toLowerCase();

  document.querySelectorAll(SELECTORS.item).forEach((item) => {
    const isVisible = item.dataset.searchable.includes(searchTerm);
    item.style.display = isVisible ? "block" : "none";
  });
}

// Event Listeners
function initialize() {
  document.addEventListener("DOMContentLoaded", async () => {
    await renderItems();
    const searchBar = document.querySelector(SELECTORS.searchBar);
    if (searchBar) {
      searchBar.addEventListener("input", handleSearch);
    }
    // Collapse expanded item when clicking outside
    document.addEventListener("click", () => {
      document
        .querySelectorAll(SELECTORS.item)
        .forEach((item) => item.classList.remove("expanded"));
    });
  });
}

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Change button text based on mode
  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});

// Start App
initialize();
