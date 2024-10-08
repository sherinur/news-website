const adminLogin = "admin@example.com"
const adminPassword = "admin"

function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    if (password === "" || email === "") {
        errorMsg.textContent = "All fields must be filled out";
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Please enter a valid email address";
        return false;
    }

    if (email = adminLogin && adminPassword == password) {
        alert("You have logged as Admin");
    } else {
        alert("You have logged as", email);
    }
    return true; 
}
