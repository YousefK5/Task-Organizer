<<<<<<< HEAD
class signUpForm  {
    constructor(fNAme, lastNAme, email, password){
        this.fNAme = fNAme;
        this.lastNAme = lastNAme
        this.email = email;
        this.password = password;
    }
};

function signUpButton(el){
    let fName = document.getElementById("sfname").value;
    let lastNAme = document.getElementById("slname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spass").value; 
    let Form = new signUpForm(fName, lastNAme, email, password);
    console.log(Form);
    el.preventDefault();
     localStorage.setItem(`${email}`, JSON.stringify(Form));
};


function SignIn(el) {
    let email = document.getElementById('LEmail');
    let password = document.getElementById('LPass')
    var user = JSON.parse(localStorage.getItem(`${email}`));
    console.log(user);
    el.preventDefault();
    if (password == user.password) {
        console.log("Welcome");
        return true;
    }
    else
        console.log("Wrong password");
        return false;

    
    
}

let counter=0

// SignUp button 
const form1 = document.getElementById("sform");
// console.log(form);
form1.addEventListener('submit', signUpButton);







const form2 = document.getElementById("lform");
form2.addEventListener('submit', SignIn)



if (SignIn) {
    
}
=======
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

//welcome message
// swal(`Hello ${name}`, `Welcome to Website !`);

>>>>>>> ebd408d0c262e57445890cc1875bf03c09bf033e
