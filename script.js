const categories = [
  { title: "Grocery", icon: "G" },
  { title: "Mobiles", icon: "M" },
  { title: "Fashion", icon: "F" },
  { title: "Electronics", icon: "E" },
  { title: "Home", icon: "H" },
  { title: "Appliances", icon: "A" },
  { title: "Travel", icon: "T" },
  { title: "Beauty", icon: "B" }
];

const deals = [
  {
    title: "Noise Smartwatch",
    subtitle: "Bluetooth calling | 2 day battery",
    price: "Rs 1,799",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "boAt Airdopes",
    subtitle: "Top rated audio gear",
    price: "Rs 999",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Nike Running Shoes",
    subtitle: "Cushioned comfort",
    price: "Rs 2,299",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kitchen Mixer",
    subtitle: "750W motor | 3 jars",
    price: "Rs 3,499",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Canon Mirrorless",
    subtitle: "4K video capture",
    price: "Rs 54,999",
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80"
  }
];

const collections = [
  {
    title: "Best of Electronics",
    items: [
      {
        title: "Gaming Monitor",
        subtitle: "144Hz refresh rate",
        price: "Rs 14,499",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Mechanical Keyboard",
        subtitle: "RGB backlit keys",
        price: "Rs 2,999",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Ultra HD Smart TV",
        subtitle: "55 inch Dolby Vision",
        price: "Rs 35,999",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Power Bank",
        subtitle: "20,000 mAh fast charge",
        price: "Rs 1,299",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    title: "Fashion Essentials",
    items: [
      {
        title: "Denim Jacket",
        subtitle: "All-season fit",
        price: "Rs 1,899",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Women Handbag",
        subtitle: "Minimal premium design",
        price: "Rs 1,299",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Casual Shirt",
        subtitle: "Breathable cotton",
        price: "Rs 799",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Sneakers",
        subtitle: "Streetwear collection",
        price: "Rs 1,499",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

const menuToggle = document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const categoryGrid = document.getElementById("categoryGrid");
const dealGrid = document.getElementById("dealGrid");
const collectionsWrap = document.getElementById("collections");
const timer = document.getElementById("dealTimer");
const scrollIndicator = document.getElementById("scrollIndicator");

const slides = [...document.querySelectorAll(".hero-slide")];
const dotsWrap = document.getElementById("heroDots");
let activeSlide = 0;
let slideTimer;

menuToggle.addEventListener("click", () => {
  mobileDrawer.classList.toggle("open");
});

function buildCategoryCards() {
  categoryGrid.innerHTML = categories
    .map(
      (category, index) => `
      <article class="category-card" data-aos="fade-up" data-aos-delay="${index * 50}">
        <div class="category-icon">${category.icon}</div>
        <p>${category.title}</p>
      </article>
    `
    )
    .join("");
}

function productTemplate(item) {
  return `
    <article class="product-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="product-copy">
        <h4>${item.title}</h4>
        <p>${item.subtitle}</p>
        <div class="product-price">${item.price}</div>
      </div>
    </article>
  `;
}

function buildDeals() {
  dealGrid.innerHTML = deals
    .map(
      (item, index) => `
      <div data-aos="fade-up" data-aos-delay="${index * 70}">
        ${productTemplate(item)}
      </div>
    `
    )
    .join("");
}

function buildCollections() {
  collectionsWrap.innerHTML = collections
    .map(
      (collection, sectionIndex) => `
      <section class="collection-block" data-aos="fade-up" data-aos-delay="${sectionIndex * 90}">
        <div class="collection-title">
          <h3>${collection.title}</h3>
          <a href="#">View all</a>
        </div>
        <div class="product-grid">
          ${collection.items.map((item) => productTemplate(item)).join("")}
        </div>
      </section>
    `
    )
    .join("");
}

function setupDots() {
  dotsWrap.innerHTML = slides
    .map(
      (_, index) => `<button aria-label="Slide ${index + 1}" data-index="${index}"></button>`
    )
    .join("");

  dotsWrap.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
      showSlide(Number(event.target.dataset.index));
    }
  });
}

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === activeSlide));
  [...dotsWrap.querySelectorAll("button")].forEach((dot, i) =>
    dot.classList.toggle("active", i === activeSlide)
  );
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    showSlide(activeSlide + 1);
  }, 5000);
}

document.getElementById("prevSlide").addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startSlider();
});

document.getElementById("nextSlide").addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startSlider();
});

document.querySelector(".hero").addEventListener("mouseenter", () => clearInterval(slideTimer));
document.querySelector(".hero").addEventListener("mouseleave", startSlider);

function updateDealTimer() {
  const now = new Date();
  const target = new Date();
  target.setHours(23, 59, 59, 999);
  const diff = target - now;

  const hours = Math.floor(diff / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diff / 1000) % 60)
    .toString()
    .padStart(2, "0");

  timer.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const width = max > 0 ? (scrollTop / max) * 100 : 0;
  scrollIndicator.style.width = `${width}%`;
}

buildCategoryCards();
buildDeals();
buildCollections();
setupDots();
showSlide(0);
startSlider();
updateDealTimer();
updateScrollProgress();

setInterval(updateDealTimer, 1000);
window.addEventListener("scroll", updateScrollProgress, { passive: true });

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: false,
  mirror: true
});
