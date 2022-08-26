//Create Constructer for Users
class User {
    constructor(fname, lname, email, pass) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pass = pass;
    }

    // _________________________________________ Add array of saved tasks to each user//Ahmad

    allTasks = [];
};

const form1 = document.getElementById("sform");
form1.addEventListener('submit', signUpButton);

// Get users from local storage 
let users;

if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
}
else {
    users = [];
}

// check first name and last name that correct

let fnameInput = document.getElementById("sfname");
let lnameInput = document.getElementById("slname");
let emailInput = document.getElementById("semail");
let isfName = true;
let islName = true;

fnameInput.onblur = (e) => {
    if (!(/^[a-z]+$/igm.test(fnameInput.value))) {
        fnameInput.style.cssText = "border: 2px solid red"
        isfName = false;
    }
    else {
        fnameInput.style.cssText = "border : none";
        isfName = true;
    }
}

lnameInput.onblur = (e) => {
    if (!(/^[a-z]+$/igm.test(lnameInput.value))) {
        lnameInput.style.cssText = "border: 2px solid red"
        islName = false;
    }
    else {
        lnameInput.style.cssText = "border : none";
        islName = true;
    }
}

let subText = document.createElement("sub");
let subEmail = document.createElement("sub");

// add action in sign up button

function signUpButton(el) {
    el.preventDefault();
    let fName = document.getElementById("sfname").value;
    let lastNAme = document.getElementById("slname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spass").value;

    //check email that regiestred
    let isEmail = false;
    users.forEach(e => {
        if (email === e.email) {
            isEmail = true;
        }
    })
    // to prevent wrong subtext reapet
    subText.style.display = "none";
    subEmail.style.display = "none";
    // if email isn't registered 
    if (!isEmail) {
        if (isfName && islName) {
            let user = new User(fName, lastNAme, email, password);
            users.push(user);
            localStorage.setItem(`users`, JSON.stringify(users));
            // __________________________________________________ Add this user index to localStorage
            localStorage.setItem('currentUserIndex', users.length - 1)
            form1.reset();

            location.replace("./home.html");
        }
        //print wrong input name subtext
        else {
            subText.innerHTML = 'First Name or Last Name is Wrong'
            subText.style.cssText = "color:red;margin:0 ; font-size:11px";
            lnameInput.after(subText);
        }
    }
    //print wrong input email subtext
    else {
        emailInput.style.cssText = "border: 2px solid red"
        subEmail.innerHTML = 'Email is already regeistred'
        subEmail.style.cssText = "color:red;margin:0 ; font-size:11px";
        emailInput.after(subEmail);
    }
};


// Login Form
const form2 = document.getElementById("lform");
form2.addEventListener('submit', SignIn)


function SignIn(el) {
    el.preventDefault();
    let email = document.getElementById('LEmail');
    let password = document.getElementById('LPass');
    let isEmail = false;
    let index = -1;
    subEmail.style.display = "none";
    users.forEach((e, i) => {
        if (email.value === e.email) {
            isEmail = true;
            index = i;
        }
    })
    if (isEmail) {
        if (password.value == users[index].pass) {
            // ___________________ Add the index of this user to local storage//Ahmad
            localStorage.setItem('currentUserIndex', index)
            location.replace("./home.html");

        }
        else {
            password.style.cssText = "border: 2px solid red"
            subText.innerHTML = 'Wrong Password'
            subText.style.cssText = "color:red;margin:0 ; font-size:13px";
            password.after(subText);
        }
    }
    else {
        email.style.cssText = "border: 2px solid red"
        subEmail.innerHTML = 'Email is not found, Sign Up please'
        subEmail.style.cssText = "color:red; margin:0 ; font-size:13px";
        email.after(subEmail);
    }
}


