const adminLogin = "admin@example.com";
const adminPassword = "admin";

const sheriLogin = "sherinurislam@gmail.com"
const sheriPassword = "Nurum123mi$"

document.addEventListener("DOMContentLoaded", function() {
    checkUserSession();

    const loginForm = document.getElementById("myForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            validateForm();
        });
    }

    const logoutButton = document.querySelector(".userinfo__logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

function checkUserSession() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn === "true" && userEmail) {
        updateUIForLoggedInUser(userEmail);
    } else {
        updateUIForLoggedOutUser();
    }
}

function validateForm() {
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");

    if (!emailElement || !passwordElement || !errorMsg) return;

    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();

    resetStyles(emailElement);
    resetStyles(passwordElement);
    errorMsg.textContent = "";

    if (email === "" || password === "") {
        errorMsg.textContent = "All fields must be filled out";
        if (email === "") applyErrorStyle(emailElement);
        if (password === "") applyErrorStyle(passwordElement);
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Please enter a valid email address";
        applyErrorStyle(emailElement);
        return false;
    }

    if (email === adminLogin && password === adminPassword) {
        alert("You have logged in as Admin");
        saveUserSession(email);
        updateUIForLoggedInUser(email);
        return true;
    } else if (email === sheriLogin && password === sheriPassword) {
        alert("You have logged in as " + sheriLogin);
        saveUserSession(email);
        updateUIForLoggedInUser(email);
        return true;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find(account => account.email === email && account.password === password);


    console.log(JSON.parse(localStorage.getItem("accounts")));

    if (user) {
        alert("You have logged in successfully");
        saveUserSession(email);
        updateUIForLoggedInUser(email);
        return true;
    } else {
        errorMsg.textContent = "Incorrect email or password";
        applyErrorStyle(passwordElement);
        return false;
    }
}


function saveUserSession(email) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
}

function updateUIForLoggedInUser(email) {
    const userName = document.querySelector(".userinfo__name");
    const loginButton = document.querySelector(".userinfo__login");
    const logoutButton = document.querySelector(".userinfo__logout");
    const signinButton = document.querySelector(".userinfo__signin");

    if (userName) {
        userName.textContent = email;
        userName.classList.remove("hidden");
    }
    if (loginButton) {
        loginButton.classList.add("hidden");
    }
    if (logoutButton) {
        logoutButton.classList.remove("hidden");
    }
    if (signinButton) {
        signinButton.classList.add("hidden");
    }
}

function updateUIForLoggedOutUser() {
    const userName = document.querySelector(".userinfo__name");
    const loginButton = document.querySelector(".userinfo__login");
    const logoutButton = document.querySelector(".userinfo__logout");
    const signinButton = document.querySelector(".userinfo__signin");

    if (userName) {
        userName.textContent = "Client name";
        userName.classList.add("hidden");
    }
    if (loginButton) {
        loginButton.classList.remove("hidden");
    }
    if (logoutButton) {
        logoutButton.classList.add("hidden");
    }
    if (signinButton) {
        signinButton.classList.remove("hidden");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    alert("You have been logged out.");
    updateUIForLoggedOutUser();
}

function resetStyles(element) {
    element.style.backgroundColor = "";
    element.style.border = "";
}

function applyErrorStyle(element) {
    element.style.backgroundColor = "#d36b6b";
    element.style.border = "1px solid #a00";
}


function resetLoginInputs() {
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if (emailElement && passwordElement) {
        emailElement.addEventListener("input", function() {
            resetStyles(this);
            document.getElementById("errorMsg").textContent = "";
        });

        passwordElement.addEventListener("input", function() {
            resetStyles(this);
            document.getElementById("errorMsg").textContent = "";
        });
    }
}

resetLoginInputs();
