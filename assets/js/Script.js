// ====================== PRE-PAGE LOADER ======================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loading-screen");
    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // fade-out duration
  }, 1000); // 1-second delay
});

// ====================== NAVBAR TOGGLE SCRIPT ======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navbar = document.querySelector(".navbar");

if (hamburger && navLinks && navbar) {
  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Shrink navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  });
}

// Animate section subtitles on scroll
const subtitles = document.querySelectorAll(".section-subtitle");

const subtitleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

subtitles.forEach((subtitle) => subtitleObserver.observe(subtitle));

// ======== SECTION HEADINGS SLIDE-IN ON SCROLL ========
const sectionHeadings = document.querySelectorAll("section h2, .section-subtitle");

const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in");
    }
  });
}, { threshold: 0.3 }); // triggers when 30% visible

sectionHeadings.forEach(el => headingObserver.observe(el));


// ====================== SKILL PROGRESS ANIMATION ======================
const skillsSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".progress");

if (skillsSection && progressBars.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(skillsSection);
}

// ====================== PROJECT SLIDER SCRIPT ======================
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");
const sliderContainer = document.querySelector(".slider-container");

let currentIndex = 0;
let slidesPerView = 4; // default for desktop
let autoSlide;
let totalSlides = slides.length;

function updateSlidesPerView() {
  if (window.innerWidth <= 480) slidesPerView = 1;
  else if (window.innerWidth <= 768) slidesPerView = 2;
  else if (window.innerWidth <= 1024) slidesPerView = 3;
  else slidesPerView = 4;
}

function createDots() {
  dotsContainer.innerHTML = "";
  const dotCount = Math.ceil(totalSlides / slidesPerView);
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => goToSlide(i));
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
}

function updateSlider() {
  const offset = currentIndex * (100 / slidesPerView);
  slider.style.transform = `translateX(-${offset}%)`;
  updateDots();
}

function nextSlide() {
  const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateSlider();
}

function prevSlide() {
  const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  updateSlider();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoSlide();
}

function startAutoSlide() {
  stopAutoSlide(); // prevent multiple intervals
  autoSlide = setInterval(() => {
    if (window.innerWidth > 768) nextSlide(); // only auto-slide on desktop
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Button navigation
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}

// Pause on hover
if (sliderContainer) {
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);
}

// Initialize slider
if (slider && slides.length > 0) {
  updateSlidesPerView();
  createDots();
  updateSlider();
  startAutoSlide();

  window.addEventListener("resize", () => {
    updateSlidesPerView();
    createDots();
    updateSlider();
  });
}

// ====================== ORDER FORM SUBMISSION ======================
function submitOrder(event) {
  event.preventDefault();
  const order = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    service: document.getElementById("service").value,
    details: document.getElementById("details").value,
  };
  console.log("Order submitted:", order);
  alert("Thank you! Your order has been submitted.");
  event.target.reset();
}

// ======== BACK TO TOP BUTTON ========
const backToTopBtn = document.getElementById("backToTop");

// Show button after scrolling down 200px
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// THEME TOGGLE FUNCTIONALITY WITH SMOOTH TRANSITIONS
const themeToggle = document.getElementById("themeToggle");
const themeDropdown = document.getElementById("themeDropdown");
const themeOptions = document.querySelectorAll(".theme-option");

// Toggle dropdown on click
themeToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent document click closing
  themeToggle.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  themeToggle.classList.remove("active");
});

// Change theme
themeOptions.forEach(option => {
  option.addEventListener("click", () => {
    const theme = option.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // save preference
    themeToggle.classList.remove("active");
  });
});

// Auto-load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "normal");
  }
});

