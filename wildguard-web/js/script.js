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
const heroImages = [
  "assets/images/lion-hero.svg",
  "assets/images/elephant-hero.svg",
  "assets/images/leopard-hero.svg",
  "assets/images/giraffe-hero.svg",
  "assets/images/eagle-hero.svg",
];

let heroIndex = 0;
setInterval(() => {
  if (!hero) {
    return;
  }
  hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  heroIndex = (heroIndex + 1) % heroImages.length;
}, 5000);
