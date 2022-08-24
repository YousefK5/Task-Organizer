class signUpForm  {
    constructor(fNAme, lastNAme, email, password){
        this.fNAme = fNAme;
        this.lastNAme = lastNAme
        this.email = email;
        this.password = password;
    }
};



function signUpButton(event){
    let fName = document.getElementById("sfname").value;
    let lastNAme = document.getElementById("slname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spass").value; 
    let Form = new signUpForm(fName, lastNAme, email, password);
    console.log(Form);
    event.preventDefault();
    localStorage.setItem("FormLocal", JSON.stringify(Form));
};

const form1 = documentgetElementById("sform");
// console.log(form);
form1.addEventListener('submit', signUpButton);




const form2
function SignIn(params) {
    
}