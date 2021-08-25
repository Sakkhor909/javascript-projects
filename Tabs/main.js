

  const tabLinks = document.querySelectorAll(".tablinks");

  tabLinks.forEach(links => {
      links.addEventListener("click", openTabs);
  });


  // 3 step function
  function openTabs () {
      // Get all elements with class="tabcontent" and hide them
      const tabContent = document.querySelectorAll(".tabcontent");
      tabContent.forEach(content => {
        content.style.display = "none";
      });

      // Get all elements with class="tablinks" and remove the class "active"
      const tabLinks = document.querySelectorAll(".tablinks");
        tabLinks.forEach(link => {
            link.className = link.className.replace(" active", "");
        });

     // Show the current tab, and add an "active" class to the button that opened the tab
       document.getElementById(this.dataset.tabid).style.display = "block";
      
        this.className += " active";
  }

  document.getElementById("defaultOpen").click();