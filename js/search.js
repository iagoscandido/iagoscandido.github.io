export function handleSearch(event) {
  const searchTerm = event.target.value.trim().toLowerCase();

  document.querySelectorAll(".desc-item").forEach((item) => {
    const isVisible = item.dataset.searchable.includes(searchTerm);
    item.style.display = isVisible ? "block" : "none";
  });
}
