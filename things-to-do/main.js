// The code is written by Minhajur rahman Sakkhor

document.addEventListener('contextmenu', event => event.preventDefault());

let listContainer =  document.querySelector("ul");
let strogeArray;
let IDGenerator = localStorage.getItem("IDGenerator");
if (!localStorage.getItem("IDGenerator")) {
    localStorage.setItem("IDGenerator", 0);
}
let app = {
            saveToStroage: function(item, ID){
                if (typeof(Storage) !== "undefined") {
                   
                    if (localStorage.getItem("items") === null){
                        strogeArray = []
                   } else {
                       strogeArray = JSON.parse(localStorage.getItem('items'));
                   }
                   let date = new Date();
                   date = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
                   strogeArray.push({
                    text : item,
                    status : false,
                    ID : ID,
                    date : date
                     });
                    localStorage.setItem('items', JSON.stringify(strogeArray));
                    this.display();
                } else {
                 // No web storage Support.
                 listContainer.innerHTML = "<h2>Your Browser does not support Web stroage, So app will not work, Please use updated version of your browser.</h2>";  }
            },
            edit : function(item){
                let theText = item.parentElement.getElementsByClassName("text")[0].innerText;
                let listMiddleSection = item.parentElement;
                listMiddleSection.innerHTML = this.createeditInput(theText);
                listMiddleSection.getElementsByClassName("editInput")[0].focus();
                // focus at last character
                let val = listMiddleSection.getElementsByClassName("editInput")[0].value;
                listMiddleSection.getElementsByClassName("editInput")[0].value = '';
                listMiddleSection.getElementsByClassName("editInput")[0].value = val;   
            },
            save : function (editItem) {
                editValue =  editItem.parentElement.getElementsByClassName("editInput")[0].value;
                strogeArray = JSON.parse(localStorage.getItem('items'));
                let editItemID = editItem.parentElement.parentElement.id.slice(4);
                const Index = strogeArray.findIndex(element => element.ID == editItemID );
                strogeArray[Index].text = editValue;
                localStorage.setItem('items', JSON.stringify(strogeArray));
                this.display();
            },
            delete: function (item){
                let deleteitem = item.parentElement.parentElement.id.slice(4);
                strogeArray = JSON.parse(localStorage.getItem('items'));
                strogeArray = strogeArray.filter(strogeArray => strogeArray.ID != deleteitem);
                localStorage.setItem('items', JSON.stringify(strogeArray));
                item.parentElement.parentElement.remove();
                this.display();

            },
            deleteAll : function (){
                let ask = confirm("This will delete permanently, all of your items in the list");
                if (ask === true){
                    localStorage.removeItem("items");
                    this.display();
                }
            },
            display : function(){
                if (localStorage.getItem("items")){
                 let   strogeArray = JSON.parse(localStorage.getItem('items'));
                    let listTag = '';
                    let ID;
                    strogeArray.forEach(object => {
                        let text = object.text
                           ID = object.ID
                           date = object.date
                        listTag += this.createListtag (text, ID, date);
                
                       });
                    listContainer.innerHTML = listTag;
                    document.querySelector("#appContainer").style.overflow = "auto";
                    let checkINP = document.querySelectorAll(".checkbox");
                    let text = document.querySelectorAll(".text");
                    let status = document.querySelectorAll(".status");
                    let options = document.getElementById("itemFilter");
                    options.innerHTML = "";
                    let completeSwitch = document.getElementById("switch-1");
                    if (localStorage.getItem("chekALL") == 1){
                        completeSwitch.checked = "checked";
                    } else {
                        completeSwitch.checked = false;
                    }

                    for (i =0; i < strogeArray.length; i++){
                     
                        if (strogeArray[i].status === true){
                            checkINP[i].setAttribute("checked", "checked");
                            text[i].style.textDecoration = "line-through";
                            status[i].innerHTML = "Completed";
                           
                        } else {
                            checkINP[i].removeAttribute("checked");
                        }
                        options.innerHTML += this.createOption(i + 1 , strogeArray[i].ID);
                    }
                    document.getElementById("switch-1").disabled = false;
                    document.getElementById("deletAll").disabled = false;
                    document.querySelector('#searchBox').style.display = "block";
                    document.getElementById("taskCountBoard").style.display = "block";
                    // Task Complete count Board
                   let taskBoard = document.getElementById("taskCountBoard");
                   let trueArray = strogeArray.filter(items => items.status == true);
                   if (trueArray.length == 0 ){
                    taskBoard.innerHTML = "None of the task is complete";
                   } else if (trueArray.length == strogeArray.length) {
                    taskBoard.innerHTML = "All of the task is complete";
                   } else {
                    taskBoard.innerHTML = `${trueArray.length} out of ${strogeArray.length} Completed `;
                   }



                } else {
                    document.querySelector("#appContainer").style.overflow = "hidden";
                    listContainer.innerHTML = "<h2 class='disable-select'>You are free now! <i class='far fa-smile-beam'></i></h2>";
                    document.getElementById("switch-1").disabled = true;
                    document.getElementById("deletAll").disabled = true;
                    document.querySelector('#searchBox').style.display = "none";
                    document.getElementById("taskCountBoard").style.display = "none";

                }
              
            },
            search : function () {
                 // Declare variables
                let input, filter, ul, li, a, i, txtValue;
                input = document.getElementById('searchinput');
                filter = input.value.toUpperCase();
                ul = document.getElementById("listItems");
                li = ul.getElementsByTagName('li');
                // Loop through all list items, and hide those who don't match the search query
                    for (i = 0; i < li.length; i++) {
                        text = li[i].getElementsByClassName("text")[0];
                        txtValue = text.textContent || text.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        li[i].style.display = "";
                          } else {
                       li[i].style.display = "none";
                         }
                       }
            },
            checkStatus : function(e){
                if(e.checked) {
                    let   strogeArray = JSON.parse(localStorage.getItem('items'));
                    let ID = e.parentElement.parentElement.id.slice(4);
                    const Index = strogeArray.findIndex(element => element.ID == ID );
                    strogeArray[Index].status = true;
                    localStorage.setItem('items', JSON.stringify(strogeArray));
                    let  status = e.parentElement.querySelector(".status");
                    status.innerHTML = "Completed"
                   e.parentElement.parentElement.querySelector(".text").style.textDecoration = "line-through";
                  
                   let checkallstatus = strogeArray.every(item => item.status == true);
                   if (checkallstatus) {
                   document.getElementById("switch-1").checked = "checked";
                   localStorage.setItem('chekALL', 1);
                   }
                   this.display();
                  
                       
                } else {
                    let   strogeArray = JSON.parse(localStorage.getItem('items'));
                    let ID = e.parentElement.parentElement.id.slice(4);
                    const Index = strogeArray.findIndex(element => element.ID == ID );
                    strogeArray[Index].status = false;
                    localStorage.setItem('items', JSON.stringify(strogeArray));
                    let  status = e.parentElement.querySelector(".status");
                    status.innerHTML = "Incompleted";
                    e.parentElement.parentElement.querySelector(".text").style.textDecoration = "none";
                    e.removeAttribute("checked");
                    localStorage.setItem('chekALL', 0);
                    this.display();
                }
            },
            toggle : function (e) {
                let checkINP = document.querySelectorAll(".checkbox");
                let text = document.querySelectorAll(".text");
                let status = document.querySelectorAll(".status");
                let strogeArray = JSON.parse(localStorage.getItem('items'));
                if (e.checked) { 
                    for (i=0; i< strogeArray.length; i++){
                        strogeArray[i].status = true;
                        checkINP[i].checked = "checked";
                        text[i].style.textDecoration = "line-through";
                        status[i].innerHTML = "Completed";
                          }
                localStorage.setItem('items', JSON.stringify(strogeArray));
                localStorage.setItem('chekALL', 1);
                this.display();
                } else {
                    for (i=0; i< strogeArray.length; i++){
                        strogeArray[i].status = false;
                        checkINP[i].checked = false;
                        text[i].style.textDecoration = "none";
                        status[i].innerHTML = "Incompleted";
                          }
                    localStorage.setItem('items', JSON.stringify(strogeArray));
                    localStorage.setItem('chekALL', 0);
                    this.display();
                }
          
            },
            filter : function (itemID) {
                location.href = `#item${itemID}`;
            },
            createListtag : function (text, ID, date){
                return `
            <li id="item${ID}">
                  <div class="listFlex">
                   <input type="checkbox" title="is it complete ?" class="checkbox" onchange="app.checkStatus(this)">
                   <span class="status"> Incomplete</span>
                  </div>
                  <div>
                     <span class="text">
                       ${text}
                     </span>
                     <button class="edit" title="edit" onclick="app.edit(this)">
                     <i class="fas fa-edit"></i>
                     </button>
                  </div>
             
                  <div class="listFlex">
                    <span class="date">${date}</span>
                    <button class="deleteButton disable-select" title="delete" onclick="app.delete(this)">
                     <i class="fas fa-backspace"></i>
                    </button>
                  </div>
            </li>`
            },
            createOption : function (itemNumber,itemID) {
                return `
                <option value="${itemID}">TO DO: ${itemNumber}</option>
                `
            },
            createeditInput : function (text) {
                return `
                <input class="editInput" type="text" value="${text}" onfocus="this.value = this.value;" autofocus />
              <button class="saveedit" title="save" onclick="app.save(this)">
              <i class="fas fa-save"></i>
              </button>
                `
            }
}

let appHandeler = {
    save : function (e) {
        e.preventDefault();
        IDGenerator++;
        localStorage.setItem("IDGenerator", IDGenerator);
        input =  document.getElementById("saveInput");
        app.saveToStroage(input.value, IDGenerator);
        input.value = "";
        lastID = IDGenerator.toString();
        location.href = `#item${lastID}`;
    }

}
// Checking the document is ready or not
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready () {
    app.display();
  
}

