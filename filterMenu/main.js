function myFunction() {
    const input = document.getElementById("mySearch");
    const filter = input.value.toUpperCase();
    const items = document.querySelectorAll('.items');
  
    // Loop through all list items, and hide those who don't match the search query
    items.forEach(item => {
        if (item.innerHTML.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });

  }