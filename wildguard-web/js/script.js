const sections = document.querySelectorAll("section");

function revealSections() {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

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

const hero = document.querySelector(".hero");
const heroFallback = "https://source.unsplash.com/1600x900/?wildlife";
const heroImages = [
  "https://source.unsplash.com/1600x900/?lion",
  "https://source.unsplash.com/1600x900/?elephant",
  "https://source.unsplash.com/1600x900/?leopard",
  "https://source.unsplash.com/1600x900/?giraffe",
  "https://source.unsplash.com/1600x900/?buffalo",
];

document.querySelectorAll(".flashcard-front img").forEach((img) => {
  img.addEventListener("error", () => {
    img.src = heroFallback;
  });
});

function setHeroImage(path) {
  if (!hero) {
    return;
  }
  const probe = new Image();
  probe.onload = () => {
    hero.style.backgroundImage = `url('${path}')`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  };
  probe.onerror = () => {
    hero.style.backgroundImage = `url('${heroFallback}')`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  };
  probe.src = path;
}

let heroIndex = 0;
setInterval(() => {
  if (!hero) {
    return;
  }
  setHeroImage(heroImages[heroIndex]);
  heroIndex = (heroIndex + 1) % heroImages.length;
}, 5000);

setHeroImage(heroImages[0]);
