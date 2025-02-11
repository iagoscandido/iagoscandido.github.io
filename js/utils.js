export function createItemElement(item) {
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

  // Store searchable text
  element.dataset.searchable =
    `${title} ${transTitle} ${shortDesc} ${fullDesc} ${tag}`.toLowerCase();

  return element;
}
