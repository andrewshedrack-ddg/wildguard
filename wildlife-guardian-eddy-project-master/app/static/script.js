function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

function narrateAnimal(name, facts) {
  const narration = `You are observing a ${name}. ${facts}`;
  speak(narration);
}

const assetPrefixes = [
  "",
  "./",
  "images/../",
  "app/static/",
  "/wildguard/",
  "/wildguard/app/static/",
];

function resolveAssetCandidates(path) {
  return assetPrefixes.map((prefix) => `${prefix}${path}`);
}

function applyImageFallback(img) {
  const original = img.getAttribute("src");
  if (!original) {
    return;
  }
  const candidates = resolveAssetCandidates(original.replace(/^\.\//, ""));
  let idx = 0;
  img.onerror = () => {
    idx += 1;
    if (idx < candidates.length) {
      img.src = candidates[idx];
    }
  };
  img.src = candidates[0];
}

const sections = document.querySelectorAll("section");
const revealSections = () => {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealSections);
revealSections();

const overlay = document.querySelector(".overlay");
if (overlay) {
  let progress = 0;
  const scanInterval = setInterval(() => {
    progress += 5;
    overlay.textContent = `Scanning... ${progress}%`;
    if (progress >= 100) {
      overlay.textContent = "African Lion Identified!";
      narrateAnimal(
        "African Lion",
        "Carnivore, lifespan 8 to 12 years, social in prides."
      );
      clearInterval(scanInterval);
    }
  }, 200);
}

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = link.getAttribute("href");
    if (!target || !target.startsWith("#")) {
      return;
    }
    e.preventDefault();
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".flashcard").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const name = card.querySelector(".flashcard-front p")?.textContent || "animal";
    const details = card.querySelector(".flashcard-back")?.innerText || "";
    narrateAnimal(name, details);
  });
});

document.querySelectorAll("img").forEach((img) => {
  applyImageFallback(img);
});

const toggle = document.createElement("button");
toggle.textContent = "Toggle Dark Mode";
toggle.setAttribute("type", "button");
toggle.style.margin = "12px";
document.body.prepend(toggle);

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const speciesImages = [
  "images/slideshow/elephant.svg",
  "images/slideshow/lion.svg",
  "images/slideshow/zebra.svg",
];

const resolvedSpeciesImages = speciesImages.map((path) => {
  const candidates = resolveAssetCandidates(path);
  return candidates[0];
});

let index = 0;
setInterval(() => {
  const hero = document.querySelector(".hero");
  if (!hero) {
    return;
  }
  const nextImage = resolvedSpeciesImages[index];
  hero.style.backgroundImage = `url(${nextImage})`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  index = (index + 1) % resolvedSpeciesImages.length;
}, 5000);
