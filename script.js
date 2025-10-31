const login = document.querySelector('#logIn');
const signUp = document.querySelector('#signUp');
const profile = document.querySelector('#profile');
const todo = document.querySelector('#todo');


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
    login.style.display = "none"
    signUp.style.display = "flex"
}

dontHaveAccount.addEventListener('click', dontHaveAccountFunc)

function haveAccountFunc() {
    login.style.display = "flex"
    signUp.style.display = "none"
}

haveAccount.addEventListener('click', haveAccountFunc)


function singUpFunc() {

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

    user.todos = []
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    accounts.push(user)

    localStorage.setItem('accounts', JSON.stringify(accounts))
    popupGreen('Account created successfully! You can now log in.');

    login.style.display = "flex"
    signUp.style.display = "none"


    fName.value = "";
    lName.value = "";
    document.querySelector('#emailS').value = "";
    document.querySelector('#passwordS').value = "";
    document.querySelector('#dob').value = "";
    document.querySelector('#phoneNumber').value = "";
    document.querySelector('#gender').value = "select gender";
}
document.querySelector('.save-profile').addEventListener('click', singUpFunc);


function logInFunc() {
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
        login.style.display = "none"
        todo.style.display = "flex"


        document.querySelector('.pName').textContent = foundUser.fName + ' ' + foundUser.lName
        document.querySelector('.pDob').textContent = foundUser.dob
        document.querySelector('.pEmail').textContent = foundUser.email
        document.querySelector('.pNumber').textContent = foundUser.phoneNumber
        document.querySelector('.pGender').textContent = foundUser.gender
        popupGreen(`Login Successful! Welcome, ${foundUser.fName}!`);
    } else {
        popup("Login Failed: Incorrect email or password.");
    }

    localStorage.setItem('logedAccount', JSON.stringify(foundUser.email));
};

document.querySelector('#button').addEventListener('click', logInFunc);


function autoLogin() {
    const loggedAccount = JSON.parse(localStorage.getItem('logedAccount'));

    if (loggedAccount) {
        login.style.display = "none";
        todo.style.display = "flex";
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        const foundUser = accounts.find(user => user.email === loggedAccount);
        todos = foundUser.todos;
    }
}

autoLogin();

function logoutFunc() {
    todo.style.display = "none";
    login.style.display = "flex";

    localStorage.removeItem('logedAccount');
    popupGreen('You have been successfully logged out.');
}

document.querySelector('.logout').addEventListener('click', logoutFunc);






// const todoInput = document.getElementById('todoInput');
// const todoList = document.getElementById('todoList');

// window.addEventListener('load', () => {
//   const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//   savedTodos.forEach(todo => createTodoElement(todo.text, todo.completed));
// });

// function saveTodos() {
//   const todos = [];
//   document.querySelectorAll('.todo-list-item').forEach(item => {
//     const text = item.querySelector('.todo-item').textContent;
//     const completed = item.querySelector('.todo-item').classList.contains('completed');
//     todos.push({ text, completed });
//   });
//   localStorage.setItem('todos', JSON.stringify(todos));
// }

// function createTodoElement(text, completed = false) {
//   const todoItemBox = document.createElement('span');
//   todoItemBox.className = 'todo-list-item';

//   const todoItemText = document.createElement('span');
//   todoItemText.className = 'todo-item';
//   todoItemText.textContent = text;

//   if (completed) {
//     todoItemText.classList.add('completed');
//     todoItemText.style.cssText = `
//       color: #fff;
//       background-color: #28a746a6;`;
//   }

//   const todoItemButtons = document.createElement('span');
//   todoItemButtons.className = 'todo-item-buttons';

//   const completeButton = document.createElement('button');
//   completeButton.className = 'complete-button';
//   completeButton.textContent = 'Complete';

//   const editButton = document.createElement('button');
//   editButton.className = 'edit-button';
//   editButton.textContent = 'Edit';

//   const deleteButton = document.createElement('button');
//   deleteButton.className = 'delete-button';
//   deleteButton.textContent = 'Delete';

//   todoItemButtons.append(completeButton, editButton, deleteButton);
//   todoItemBox.append(todoItemText, todoItemButtons);
//   todoList.appendChild(todoItemBox);

//   completeButton.addEventListener('click', function () {
//     todoItemText.classList.toggle('completed');
//     if (todoItemText.classList.contains('completed')) {
//       todoItemText.style.cssText = `
//         color: #fff;
//         background-color: #28a746a6;`;
//     } else {
//       todoItemText.style.cssText = `
//       color: #000;
//       background-color: #f7f7f7;`;
//     }
//     saveTodos();
//   });

//   editButton.addEventListener('click', function () {
//     if (editButton.textContent === 'Edit') {
//       const input = document.createElement('input');
//       input.type = 'text';
//       input.value = todoItemText.textContent;
//       input.className = 'edit-input';

//       todoItemBox.insertBefore(input, todoItemButtons);
//       todoItemText.remove();

//       editButton.textContent = 'Save';
//       editButton.style.backgroundColor = '#4caf50';
//     } else {
//       const input = todoItemBox.querySelector('.edit-input');
//       const newText = input.value.trim();

//       if (newText !== '') {
//         todoItemText.textContent = newText;
//       }

//       input.remove();
//       todoItemBox.insertBefore(todoItemText, todoItemButtons);
//       editButton.textContent = 'Edit';
//       editButton.style.backgroundColor = '#2196f3';
//       saveTodos();
//     }
//   });

//   deleteButton.addEventListener('click', function () {
//     todoItemBox.remove();
//     saveTodos();
//   });
// }

// function addTodo() {
//   const text = todoInput.value.trim();
//   if (text === '') return;
//   createTodoElement(text);
//   todoInput.value = '';
//   saveTodos();
// }

// todoInput.addEventListener('keydown', function (event) {
//   if (event.key === 'Enter') {
//     addTodo();
//   }
// });
