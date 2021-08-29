

const catagorise = document.querySelectorAll(".catagory");
const Phones = ["Walton", "Samsung", "Symphony", "nokia"];
const Electronics = ["Geforce", "Acer", "IBM", "4Tech"];
const bikes = ["Pulser", "Yamaha", "bazaz"];
const listSection = document.querySelector("#itemList");
const list = document.getElementById("list");

function searchbar() {
    const searchBar = document.getElementById("Search-item");
    searchBar.addEventListener("keyup", () => {
        let filter = searchBar.value.toUpperCase();
        // Loop through all list items, and hide those who don't match the search query
        const items = document.querySelectorAll(".items");
        items.forEach(item => {
            if (item.innerHTML.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
}



catagorise.forEach(catagory => {
    catagory.addEventListener("change", e => {
        document.getElementById("default-msg").style.display = "none";
        document.getElementById("itemList").style.display = "block";  
        if (e.target.defaultValue === "Phone" ) {

            list.innerHTML = "";
            Phones.forEach((phone, index) => {
             
                const div = document.createElement("div");
                const input = document.createElement("input");
                const label = document.createElement("label");
                div.classList.add("items");
                list.appendChild(div);
                input.setAttribute("type", "checkbox");
                div.appendChild(input);
                div.appendChild(label);
                input.setAttribute("id", Phones[index]);
                label.textContent = Phones[index];
                
            });

            searchbar();
       
        }
        if (e.target.defaultValue === "Electronics" ) {
            list.innerHTML = "";
            Electronics.forEach((phone, index) => {
          
                const div = document.createElement("div");
                const input = document.createElement("input");
                const label = document.createElement("label");
                div.classList.add("items");
                list.appendChild(div);
                input.setAttribute("type", "checkbox");
                div.appendChild(input);
                div.appendChild(label);
                input.setAttribute("id", Electronics[index]);
                label.textContent = Electronics[index];
                
            });
            searchbar();
        }
        if (e.target.defaultValue === "Bike" ) {
            list.innerHTML = "";
            bikes.forEach((phone, index) => {
              
                const div = document.createElement("div");
                const input = document.createElement("input");
                const label = document.createElement("label");
                div.classList.add("items");
                list.appendChild(div);
                input.setAttribute("type", "checkbox");
                div.appendChild(input);
                div.appendChild(label);
                input.setAttribute("id", bikes[index]);
                label.textContent = bikes[index];
                
            });
            searchbar();
        }
    });
});




