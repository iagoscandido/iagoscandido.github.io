export function handleSearch(event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const searchTerms = searchValue.split(/\s+/).filter((term) => term);

  document.querySelectorAll(".item").forEach((item) => {
    const searchableText = item.dataset.searchable.toLowerCase();

    const isVisible = searchTerms.every((term) =>
      searchableText.includes(term)
    );

    item.style.display = isVisible ? "block" : "none";
  });
}
