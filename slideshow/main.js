let slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(currentSlideIndex) {
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");


  // checking for plusSlide function
  if (currentSlideIndex > slides.length) {
      slideIndex = 1;
    }

  if (currentSlideIndex < 1) {
      slideIndex = slides.length
    }
  // Hide all the slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });
  // hide all the active dots
   dots.forEach(dot => {
    dot.className = dot.className.replace(" active", "");
   });

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}