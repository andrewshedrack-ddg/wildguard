const searchInput = document.getElementById("searchInput");
const cards = [...document.querySelectorAll(".flashcard")];
const filterButtons = document.querySelectorAll(".filters button");

function applyFilters() {
  const q = (searchInput?.value || "").toLowerCase().trim();
  const activeFilter = document.querySelector(".filters button.active")?.dataset.filter || "all";

  cards.forEach((card) => {
    const matchesText = card.dataset.name.toLowerCase().includes(q);
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    card.style.display = matchesText && matchesCategory ? "inline-block" : "none";
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

async function loadSpecies(name) {
  try {
    const res = await fetch(`/library/species/${encodeURIComponent(name)}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    const item = data.results && data.results[0];
    if (!item) {
      return;
    }

    const grid = document.querySelector(".organism-grid");
    if (!grid) {
      return;
    }

    const card = document.createElement("div");
    card.className = "flashcard";
    card.dataset.category = "animals";
    card.dataset.name = item.canonicalName || name;
    card.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <img src="assets/images/lion.svg" alt="${item.canonicalName || name}">
          <p>${item.canonicalName || name}</p>
        </div>
        <div class="flashcard-back">
          <p><strong>Kingdom:</strong> ${item.kingdom || "Unknown"}</p>
          <p><strong>Phylum:</strong> ${item.phylum || "Unknown"}</p>
          <p><strong>Habitat:</strong> ${item.habitat || "Unknown"}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
    cards.push(card);
    applyFilters();
  } catch (err) {
    console.error("Failed to load species", err);
  }
}

if (filterButtons[0]) {
  filterButtons[0].classList.add("active");
}
applyFilters();

// Example enrichment calls when served by backend/http.
if (window.location.protocol.startsWith("http")) {
  loadSpecies("Panthera leo");
  loadSpecies("Adansonia digitata");
}
