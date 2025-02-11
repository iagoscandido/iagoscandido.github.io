import { loadItems } from "./data.js";
import { createItemElement } from "./utils.js";

const containerSelector = "#items-container";

export async function renderItems() {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Container element not found!");
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
      container.innerHTML = "<p>No items found</p>";
    }
  } catch (error) {
    container.innerHTML = "<p>No items found</p>";
  }
}
