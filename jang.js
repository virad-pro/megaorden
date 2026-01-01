const text = [
  "you are chosen",
  "do not resist"
  
];
let warningtex=document.querySelector(".warning-tex")

const speed = 90;
let k = 0; // current string index
let first=document.querySelector(".first");
let second=document.querySelector(".second");
let skull=document.querySelector(".skull");

function typeWriter(i) {
  if (i < text[k].length) {
    document.querySelector(".beginp").textContent += text[k].charAt(i);
    setTimeout(() => typeWriter(i + 1), speed);
  } else {
    setTimeout(() => reversetype(text[k].length - 1), speed);
  }
}

function reversetype(j) {
  if (j >= 0) {
    document.querySelector(".beginp").textContent = text[k].substring(0, j + 1);
    setTimeout(() => reversetype(j - 1), speed);
  } else {
    k++;
    if (k < text.length) {
      setTimeout(() => {
        document.querySelector(".beginp").textContent = "";
        typeWriter(0);
      }, speed);
    }
    else{
        // Fade to black
         document.getElementById("blackout").style.opacity = 1;
         setTimeout(()=>{
             document.querySelector(".skull").style.display="flex";
         },3000);
         setTimeout(()=>{
            document.querySelector(".skull").style.display="none";
         },7000);
        
    }
  }
}
// Select the element
let warning=document.querySelector(".warning");

// Create observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      warningtex.classList.add('animate');   // Start animation
    } else {
      warningtex.classList.remove('animate'); // Optional: reset when out of view
    }
  });
}, {
  threshold: 0.2 // Trigger when 20% of element is visible
});


// Observe the target

skull.addEventListener("animationend",()=>{
  second.style.display="block";
  first.remove();
  window.scrollTo(0, 0);
  observer.observe(warningtex);

  

})
typeWriter(0);

const items = document.querySelectorAll(".members");
const carousel = document.querySelector(".carousel");

let currentIndex = 0;
let isAnimating = false;

function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    element.scrollLeft = start + change * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating = false; // unlock after animation
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener(
  "wheel",
  (e) => {
    if (!carousel || isAnimating) return;

    const rect = carousel.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    const slideWidth = carousel.offsetWidth;

    // Check if we are moving DOWN and have slides left
    const canMoveForward = e.deltaY > 0 && currentIndex < items.length - 1;
    
    // Check if we are moving UP and have slides left
    const canMoveBackward = e.deltaY < 0 && currentIndex > 0;

    if (canMoveForward || canMoveBackward) {
      // ONLY prevent default if we are moving within the carousel
      e.preventDefault(); 
      
      isAnimating = true;
      if (canMoveForward) currentIndex++;
      else currentIndex--;

      smoothScrollTo(carousel, currentIndex * slideWidth, 600);
    } 
    // If neither is true, we don't call e.preventDefault(), 
    // allowing the browser to scroll the page up or down naturally.
  },
  { passive: false }
);
const elM = document.querySelector('.minutes');
const elS = document.querySelector('.seconds');

const pad = n => String(n).padStart(2, '0');

// Set starting time (in seconds)
let timeLeft = 10* 60; // 5 minutes

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  elM.textContent = pad(minutes);
  elS.textContent = pad(seconds);

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval);
    // Optional: show a message when timer ends
    document.querySelector('.timer').textContent = "TIME UP!";
  }
}

// Start immediately, then tick every second
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

const carouselContainer = document.querySelector(".carousel-container");








let timerwrap=document.querySelector(".timer-wrap");
warningtex.addEventListener("animationend",()=>{
  warning.style.display="none";
  timerwrap.style.display="flex";
  

})