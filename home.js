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





// ___________ cardsRow______________

// which user profile is currently active ?
let currentUserIndex = localStorage.getItem('currentUserIndex');

// Call user's array list of saved tasks
let usersArr = JSON.parse(localStorage.getItem('users'))
let currentUser = usersArr[currentUserIndex];
// print saved tasks 
let userSavedTasks = currentUser.allTasks;
printTask(userSavedTasks);

// ______________________ FisrtName Welcome
let name = document.getElementById('firstNameWlc').textContent = currentUser.fname;


// constrctor  to make new task

function newTask(taskTitle, taskDescription, taskPriority) {
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskPriority = taskPriority;
}

// add new task to array on submit
let addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', subFunction);

function subFunction(e) {
    e.preventDefault();
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDescription = document.getElementById('taskDescription').value;
    let taskPriority = document.querySelector('input[name="priority"]:checked').value;
    let task = new newTask(taskTitle, taskDescription, taskPriority);
    userSavedTasks.push(task);
    localStorage.setItem('users', JSON.stringify(usersArr));
    addNewTask(task);

}

function printTask(arr) {
    for (let i = 0; i < arr.length; i++)
        addNewTask(arr[i])
}


function addNewTask(task) {

    // define card layout 

    let taskRow = document.getElementById('tasksRow');
    let taskCard = document.createElement('div')

    taskCard.classList.add('col-md-4', 'taskCard');
    taskRow.appendChild(taskCard);

    let title = document.createElement('h3');
    taskCard.appendChild(title);

    let taskBody = document.createElement('div');
    taskCard.appendChild(taskBody);
    taskBody.classList.add('taskBody');

    let taskDescription = document.createElement('p');
    taskBody.appendChild(taskDescription);

    let doneRemoveDiv = document.createElement('div');
    taskBody.appendChild(doneRemoveDiv);
    doneRemoveDiv.classList.add('doneRemoveDiv');


    let removeTaskBtn = document.createElement('button');
    doneRemoveDiv.appendChild(removeTaskBtn);
    removeTaskBtn.classList.add('removeTaskBtn');
    removeTaskBtn.innerHTML = '<i class="fa-regular fa-trash-can fa-2xl"></i>'


    let doneTaskBtn = document.createElement('button');
    doneRemoveDiv.appendChild(doneTaskBtn);
    doneTaskBtn.classList.add('doneTaskBtn');
    doneTaskBtn.innerHTML = '<i class="fa-regular fa-circle-check fa-2xl"></i>'


    let taskPriority = document.createElement('div');
    taskCard.appendChild(taskPriority);
    taskPriority.classList.add('priorityImgParent')


    let priorityImg = document.createElement('img');
    taskPriority.appendChild(priorityImg);


    // define values
    title.textContent = task.taskTitle;
    taskDescription.textContent = task.taskDescription;

    if (task.taskPriority == 'critical') {
        taskPriority.classList.add('criticalPriority');
        priorityImg.setAttribute('src', './img/high-priority.png');
        title.style.backgroundColor = "#FD4848";
    }
    else if (task.taskPriority == 'normal') {
        taskPriority.classList.add('meduimPriority');
        priorityImg.setAttribute('src', './img/normal-priority.png');
        title.style.backgroundColor = "#FFBA4A";

    }
    else {
        taskPriority.classList.add('lowerPriority');
        priorityImg.setAttribute('src', './img/low-priority.png');
        title.style.backgroundColor = "#00c9af";

    }
}


