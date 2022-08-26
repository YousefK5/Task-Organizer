// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();

//End of set theme

// Get Element from HTML
let formTask = document.getElementById("newTask");
let cards=document.getElementById("cardsTask");
let outBtn=document.getElementById("signOutBtn");
let delBtn=document.getElementById("delBtn");
let filterSelect=document.getElementById("filter");
let clearButton=document.getElementById("clearBtn");
let welcomeName=document.getElementById("welcomeName");

//Edit Welcome Message
welcomeName.innerHTML= `${curUser.fname} ${curUser.lname}`;

// To show old tasks for user in saved tasks section
function loadOldTasks(arr) {
    // To loop Tasks Array for the current user
    arr.forEach((element,i) => {
        // To Create new Div for task and append it in HTML Page
        let cardTask=document.createElement("div");
        cardTask.innerHTML= `<h3>${element.title}</h3>
        <p>${element.desc}</p>
        <label for="complete${i}"> Completed</label>
        <input type="checkbox" ${element.isCompleted ? 'checked' : ''} id="complete${i}">
        <button id="delBtn">Delete</button>`
        cardTask.classList=`cardTask`
        cardTask.style.cssText=`box-shadow: 1px 1px 12px 8px ${element.colors};`;
        cards.append(cardTask);
    });
}

//Ensure user already have old tasks
if(users.length != (curIndex+1)) {
    loadOldTasks(users[curIndex].tasks);
}

//Constructer to save task in new object
function Task(title,desc,priority) {
    this.title=title;
    this.desc=desc;
    this.priority=priority;
    this.isCompleted = false; 
    this.color = function () {
        switch(this.priority) {
            case "Critical":
                return "red";
                break;
            case "Normal":
                return "yellow";
                break;
            case "Low":
                return "green";
                break;
        }
    }
    // To save Priority color in variable
    this.colors= this.color();
}

// Call function addTask when submitted form 
formTask.addEventListener("submit" , addTask);

// To add new Task in section saved Tasks
function addTask(e) {
    e.preventDefault();
    // To save info task and create object of task
    let title= document.getElementById("title").value;
    let desc= document.getElementById("desc").value;
    let prio= document.querySelector('input[name="priority"]:checked').value;
    let task=new Task(title,desc,prio);

    // To Create new Div for task and append it in HTML Page
    let cardTask=document.createElement("div");
    cardTask.innerHTML= `<h3>${title}</h3>
    <p>${desc}</p>
    <label for="complete${users[curIndex].tasks}"> Completed</label>
    <input type="checkbox" id="complete${users[curIndex].tasks}">
    <button id="delBtn">Delete</button>`
    cardTask.classList=`cardTask`
    cardTask.style.cssText=`box-shadow: 1px 1px 12px 8px ${task.color()};`;
    cards.append(cardTask);

    //To Clear a form
    formTask.reset();

    //To Save new Task in Local Storage
    users[curIndex].tasks.push(task);
    localStorage.setItem("users" , JSON.stringify(users));
    location.reload();
}

//To move to index page and logout from website
outBtn.onclick = () => {
    localStorage.removeItem("curIndex");
    location.replace("./index.html");
}

//To delete card task
document.addEventListener("click" , (e) => {
    //check click button is equal delete button
    if(e.target.id == "delBtn") {
        // alert to confirm delete proccess
        swal({
            title: "Are you sure?",
            text: "You Will Delete The Task",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            // if user press OK proccess will completed 
            if (willDelete) {
              swal("Done , Deleted the Task", {
                icon: "success",
              });
              //To Remove task from HTML page and remove it from local storage
              e.path[1].remove();
              let indexOfTask= Array.prototype.indexOf.call(cards.children, e.path[1]);
              users[curIndex].tasks.splice(indexOfTask,1);
              localStorage.setItem("users",JSON.stringify(users));
            }
          });
    }
})

//to change tho show tasks in saved tasks section depand on priority
filterSelect.onchange = (e) => {
    let prio=e.target.value;
    //if user choose all will show all tasks
    if(prio=="All") {
        users[curIndex].tasks.forEach((e ,i) => { 
            cards.children[i].style.display="block";
        })
    }
    else {
        // To loop in array tasks for current user
        users[curIndex].tasks.forEach((e ,i) => {
            if(e.priority == prio) {
                cards.children[i].style.display="block";
            }
            else {
                cards.children[i].style.display="none";
            }
        })
    }
}

//To clear completed tasks
clearButton.onclick= (e) => {
    //index to loop over cards
    swal({
        title: "Are you sure?",
        text: "You will delete all completed tasks",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let i=0;
            for (let i=0;i<cards.children.length;i++) {
            if(cards.children[i].children[3].checked) {
            //To Remove completed task card from HTML Page and local storage
                cards.children[i].remove();
                users[curIndex].tasks.splice(i,1);
                localStorage.setItem("users",JSON.stringify(users));
                i--;
        }
    }
          swal("Done", {
            icon: "success",
          });
          location.reload();
        }
      });
}

let completeInput = document.querySelector(`[type = 'checkbox']`);

document.addEventListener("click" , (e) => {
    if(e.target.type == "checkbox") {
        let index= e.target.id.slice(8);
        users[curIndex].tasks[index].isCompleted = e.target.checked;
        localStorage.setItem("users" , JSON.stringify(users));
    }
})