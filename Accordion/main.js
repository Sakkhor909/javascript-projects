
const accordion = document.querySelectorAll(".accordion");


accordion.forEach(elements => {
    elements.addEventListener('click', function(){
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        console.log(panel.style.maxHeight);
        console.log(panel.scrollHeight);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
    });
  });