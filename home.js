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


// swal("Welcome Dareen!", "Go to Sleep");


let formTask = document.getElementById("newTask");
let cards=document.getElementById("cardsTask");

let users= JSON.parse(localStorage.getItem("users"));
let curIndex=localStorage.getItem("curIndex");
let curUser=users[curIndex];

let outBtn=document.getElementById("signOutBtn");
let delBtn=document.getElementById("delBtn");

if(users.length != (curIndex+1)) {
    addTasks(users[curIndex].tasks);
}

function Task(title,desc,priority) {
    this.title=title;
    this.desc=desc;
    this.priority=priority;
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
    this.colors= this.color();
}

formTask.addEventListener("submit" , addTask);

function addTask(e) {
    e.preventDefault();
    let title= document.getElementById("title").value;
    let desc= document.getElementById("desc").value;
    let prio= document.querySelector('input[name="priority"]:checked').value;
    let task=new Task(title,desc,prio);

    let cardTask=document.createElement("div");
    cardTask.innerHTML= `<h3>${title}</h3>
    <p>${desc}</p>
    <label for="complete${users[curIndex].tasks}"> Completed</label>
    <input type="checkbox" id="complete${users[curIndex].tasks}">
    <button id="delBtn">Delete</button>`
    cardTask.classList=`cardTask `
    cardTask.style.cssText=`box-shadow: 1px 1px 12px 8px ${task.color()};`;
    cards.append(cardTask);
    formTask.reset();
    users[curIndex].tasks.push(task);
    localStorage.setItem("users" , JSON.stringify(users));
}


function addTasks(arr) {
    arr.forEach((element,i) => {
        let cardTask=document.createElement("div");
        cardTask.innerHTML= `<h3>${element.title}</h3>
        <p>${element.desc}</p>
        <label for="complete${i}"> Completed</label>
        <input type="checkbox" id="complete${i}">
        <button id="delBtn">Delete</button>`
        cardTask.classList=`cardTask`
        cardTask.style.cssText=`box-shadow: 1px 1px 12px 8px ${element.colors};`;
        cards.append(cardTask);
    });
}

outBtn.onclick = () => {
    localStorage.removeItem("curIndex");
    location.replace("./index.html");
}

document.addEventListener("click" , (e) => {
    if(e.target.id == "delBtn") {
        e.path[1].style.display="none";
        let indexOfTask= Array.prototype.indexOf.call(cards.children, e.path[1]);
        users[curIndex].tasks.splice(indexOfTask,1);
        localStorage.setItem("users",JSON.stringify(users));
    }
})