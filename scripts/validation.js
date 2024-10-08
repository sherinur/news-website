function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const errorMsg = document.getElementById("errorMsg");

    if (name === "" || email === "") {
        errorMsg.textContent = "All fields must be filled out";
        return false; // Prevent form submission
    }

    // Simple email validation (basic check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Please enter a valid email address";
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}
