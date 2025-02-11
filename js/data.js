const DATA_URL = "../data/items.json";

export async function loadItems() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error loading items:", error);
    return [];
  }
}
