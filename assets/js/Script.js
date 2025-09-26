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
const navbar = document.getElementById("navbar");
const strong = document.getElementById("strong");
strong.style.color = "#ff5614"; 

window.onscroll = function(){
    if(window.scrollY > 50){
        navbar.classList.add('navbar-shrink');
        strong.style.color = "#fff"; 
    }else{
        navbar.classList.remove('navbar-shrink');
        strong.style.color = "#ff5614"; 
    }
}

//active navlinks
const navlink= Array.from(document.querySelectorAll(".navLink"));

for(let i = 0;i < navlink.length;i++){
    navlink[i].addEventListener("click",function(){
        for(let j = 0;j < navlink.length;j++){
            navlink[j].classList.remove("active");
        }
        navlink[i].classList.add("active");
    })
}

//responsive navbar/mobile menu
const nav = document.getElementById("nav");
const themeBtn = document.querySelector(".theme-btn");
const menuIcon = document.getElementById("menuIcon");

function mobileBtn(){
    nav.classList.toggle('shonav');
    themeBtn.classList.toggle('visible');
    if(menuIcon.classList.contains('bi-list')){
        menuIcon.classList.remove('bi-list')
        menuIcon.classList.add('bi-x-lg')
    }else{
        menuIcon.classList.remove('bi-x-lg')
        menuIcon.classList.add('bi-list')
    }
}

// theme changing
const Mybody= document.getElementById("myBody");
function changTheme(){
   Mybody.classList.toggle('dark');
}

//Skills Animation
window.addEventListener('load', () => {
  const section = document.querySelector('.skills-section');
  section.classList.add('visible');

  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
});