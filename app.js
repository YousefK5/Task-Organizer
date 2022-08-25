class signUpForm  {
    constructor(fNAme, lastNAme, email, password){
        this.fNAme = fNAme;
        this.lastNAme = lastNAme
        this.email = email;
        this.password = password;
    }
};

let counter=0

// SignUp button 
const form1 = document.getElementById("sform");
// console.log(form);
form1.addEventListener('submit', signUpButton);

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






const form2 = document.getElementById("lform");
form2.addEventListener('submit', SignIn)

function SignIn(el) {
    let email = document.getElementById('');
    let password = document.getElementById('')
    var user = JSON.parse(localStorage.getItem(`"${email}"`));
    console.log(user);
    el.preventDefault();
    if (password == `${user.password}`) {
        console.log("Welcome");
        return true;
    }
    else
        console.log("Wrong password");
        return false;

    
    
}

if (SignIn) {
    
}