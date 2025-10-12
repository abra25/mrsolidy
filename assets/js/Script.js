//pre-page  loader
window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        //const content = document.querySelector('.content');

        loader.classList.add('hidden');

        setTimeout(() => {
          loader.style.display = 'none';
          //content.style.display = 'block';
        }, 500); // Fade-out duration
      }, 1000); // 1-second delay
    });

//shrinking navbar & change background on scroll
// const navbar = document.getElementById("navbar");
// const strong = document.getElementById("strong");
// strong.style.color = "#ff5614"; 

// window.onscroll = function(){
//     if(window.scrollY > 50){
//         navbar.classList.add('navbar-shrink');
//         strong.style.color = "#fff"; 
//     }else{
//         navbar.classList.remove('navbar-shrink');
//         strong.style.color = "#ff5614"; 
//     }
// }

//active navlinks
// const navlink= Array.from(document.querySelectorAll(".navLink"));

// for(let i = 0;i < navlink.length;i++){
//     navlink[i].addEventListener("click",function(){
//         for(let j = 0;j < navlink.length;j++){
//             navlink[j].classList.remove("active");
//         }
//         navlink[i].classList.add("active");
//     })
// }

// ======== NAVBAR TOGGLE SCRIPT ========
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Optional: close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

    // Animate progress bars when scrolled into view
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(skillsSection);

    // ======== PROJECT SLIDER SCRIPT ========
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slidesPerView = 4; // default for desktop
  let autoSlide;

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
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const offset = currentIndex * (100 / slidesPerView);
    slider.style.transform = `translateX(-${offset}%)`;
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
    currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
    currentIndex = (currentIndex - 1) < 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      if (window.innerWidth > 768) nextSlide(); // only auto-slide on desktop
    }, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  window.addEventListener("resize", () => {
    updateSlidesPerView();
    createDots();
    updateSlider();
  });

  // Init
  updateSlidesPerView();
  createDots();
  updateSlider();
  startAutoSlide();

    // Form submission (connect to backend)
    function submitOrder(event) {
      event.preventDefault();
      const order = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        details: document.getElementById('details').value
      };
      console.log('Order submitted:', order);
      alert('Thank you! Your order has been submitted.');
      event.target.reset();
    }