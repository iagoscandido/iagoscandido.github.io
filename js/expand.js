export function setupExpandFeature() {
  document.addEventListener("click", () => {
    document.querySelectorAll(".item.expanded").forEach((item) => {
      item.classList.remove("expanded");
    });
  });

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent bubbling

      if (item.classList.contains("expanded")) {
        item.classList.remove("expanded");
      } else {
        document
          .querySelectorAll(".item.expanded")
          .forEach((el) => el.classList.remove("expanded"));
        item.classList.add("expanded");
      }
    });
  });
}
