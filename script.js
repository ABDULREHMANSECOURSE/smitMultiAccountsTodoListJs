function popup(text) {
    const popup = document.createElement('span');
    popup.className = 'popup';
    const p = document.createElement('p');
    p.textContent = text;
    popup.appendChild(p);
    document.body.appendChild(popup);
}
function popupGreen(text) {
    const popup = document.createElement('span');
    popup.className = 'popup';
    popup.style.backgroundColor = 'green';
    const p = document.createElement('p');
    p.textContent = text;
    popup.appendChild(p);
    document.body.appendChild(popup);
}

function togglePasEye() {
    if (passinp.type === 'password') {
        passinp.type = 'text';
        pasEye.src = 'assets/eyeoff.png';
    } else {
        passinp.type = 'password';
        pasEye.src = 'assets/eyeon.png';
    }
}
const passinp = document.querySelector('#password');
const pasEye = document.querySelector('#passEye');

pasEye.addEventListener('click', togglePasEye);



function togglePasEyeS() {
    if (passwordS.type === 'password') {
        passwordS.type = 'text';
        eyeS.src = 'assets/eyeoff.png';
    } else {
        passwordS.type = 'password';
        eyeS.src = 'assets/eyeon.png';
    }
}
const passwordS = document.querySelector('#passwordS')
const eyeS = document.querySelector('#eyeS')

eyeS.addEventListener('click', togglePasEyeS);






const dontHaveAccount = document.querySelector('.dontHaveAccount')

const haveAccount = document.querySelector('.haveAccount')

function dontHaveAccountFunc() {
    document.querySelector('#logIn').style.display = "none"
    document.querySelector('#signUp').style.display = "flex"
}

dontHaveAccount.addEventListener('click', dontHaveAccountFunc)

function haveAccountFunc() {
    document.querySelector('#logIn').style.display = "flex"
    document.querySelector('#signUp').style.display = "none"
}

haveAccount.addEventListener('click', haveAccountFunc)






function singUp() {

    const user = {}

    const fName = document.querySelector('#fname')
    const lName = document.querySelector('#lname')

    if (fName.value.length >= 3 && fName.value.length <= 12) {
        fName.style.border = "none";
        user.fName = fName.value;
    } else {
        popup('First name must be between 3 and 12 characters.');
        fName.style.border = "2px solid red";
        return;
    }
    if (lName.value.length >= 3 && lName.value.length <= 12) {
        lName.style.border = "none";
        user.lName = lName.value;
    } else {
        popup('Last name must be between 3 and 12 characters.');
        lName.style.border = "2px solid red";
        return;
    }


    const gender = document.querySelector('#gender')

    if (gender.value !== 'select gender') {
        user.gender = gender.value
    } else {
        popup('select gender')
        return;
    }

    const emailS = document.querySelector('#emailS').value

    const checkEmail = JSON.parse(localStorage.getItem('accounts'));

    if (checkEmail) {
        const emailExists = checkEmail.find((eF) => eF.email === emailS);
        if (emailExists) {
            popup('email already exists');
            return;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailS.length >= 3 && emailS.length <= 254 && emailRegex.test(emailS)) {
        user.email = emailS
    } else {
        popup('enter a valid email')
        return;
    }

    const password = document.querySelector('#passwordS').value

    for (let i = 0; i < password.length; i++) {
        if (password[i] === " ") {
            popup("Space is not allowed in password");
            return;
        }
    }
    if (password.length >= 8) {
        user.password = password
    } else {
        popup("password must be 8 charector")
        return;
    }

    const dob = document.querySelector('#dob').value

    if (dob.length == 10) {
        user.dob = dob
    } else {
        popup('enter valid date of birth')
        return;
    }

    const phoneNumberRegex = /^((\+92|0092|92)?(0)?)(3)([0-9]{9})$/
    const phoneNumber = document.querySelector('#phoneNumber').value

    if (phoneNumberRegex.test(phoneNumber)) {
        user.phoneNumber = phoneNumber
    } else {
        popup('incorrect phone number')
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    accounts.push(user)

    localStorage.setItem('accounts', JSON.stringify(accounts))
    popupGreen('Account created successfully! You can now log in.');

    document.querySelector('#logIn').style.display = "flex"
    document.querySelector('#signUp').style.display = "none"


    fName.value = "";
    lName.value = "";
    document.querySelector('#emailS').value = "";
    document.querySelector('#passwordS').value = "";
    document.querySelector('#dob').value = "";
    document.querySelector('#phoneNumber').value = "";
    document.querySelector('#gender').value = "select gender";
}

document.querySelector('.save-profile').addEventListener('click', singUp);





function logIn() {
    const emailL = document.querySelector('#emailL')
    const passwordL = document.querySelector('#password')

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    let foundUser = null

    for (let i = 0; i < accounts.length; i++) {
        const user = accounts[i];

        if (user.email === emailL.value && user.password === passwordL.value) {
            foundUser = user
            break;
        }
    }

    if (foundUser) {
        emailL.value = ""
        passwordL.value = ""
        document.querySelector('#logIn').style.display = "none"
        document.querySelector('#profile').style.display = "flex"


        document.querySelector('.pName').textContent = foundUser.fName + ' ' + foundUser.lName
        document.querySelector('.pDob').textContent = foundUser.dob
        document.querySelector('.pEmail').textContent = foundUser.email
        document.querySelector('.pNumber').textContent = foundUser.phoneNumber
        document.querySelector('.pGender').textContent = foundUser.gender
        popupGreen(`Login Successful! Welcome, ${foundUser.fName}!`);
    } else {
        popup("Login Failed: Incorrect email or password.");
    }

    localStorage.setItem('logedAccount', JSON.stringify(foundUser))
};

document.querySelector('#button').addEventListener('click', logIn)







function autoLogin() {
    const loggedAccount = JSON.parse(localStorage.getItem('logedAccount'));

    if (loggedAccount) {
        document.querySelector('#logIn').style.display = "none";
        document.querySelector('#profile').style.display = "flex";

        document.querySelector('.pName').textContent = loggedAccount.fName + ' ' + loggedAccount.lName;
        document.querySelector('.pDob').textContent = loggedAccount.dob;
        document.querySelector('.pEmail').textContent = loggedAccount.email;
        document.querySelector('.pNumber').textContent = loggedAccount.phoneNumber;
        document.querySelector('.pGender').textContent = loggedAccount.gender;
    }
}

autoLogin();

function logoutFunc() {
    document.querySelector('#profile').style.display = "none";
    document.querySelector('#logIn').style.display = "flex";

    localStorage.removeItem('logedAccount')
    popupGreen('You have been successfully logged out.');
}

document.querySelector('.logout').addEventListener('click', logoutFunc)