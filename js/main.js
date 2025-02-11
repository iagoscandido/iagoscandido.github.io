import { loadItems } from "./data.js";
import { renderItems } from "./render.js";
import { handleSearch } from "./search.js";
import { setupExpandFeature } from "./expand.js";
import { initThemeToggle } from "./darkmode.js";

function initialize() {
  document.addEventListener("DOMContentLoaded", async () => {
    await renderItems();
    const searchBar = document.querySelector(".search-bar");
    if (searchBar) {
      searchBar.addEventListener("input", handleSearch);
    }
    loadItems();
    initThemeToggle();
    setupExpandFeature();
  });
}

initialize();
