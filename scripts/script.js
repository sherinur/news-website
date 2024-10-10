const adminLogin = "admin@example.com"
const adminPassword = "admin"

// Form Validation (login.html)
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

    if (email === adminLogin) {
        if (adminPassword === password) {
            alert("You have logged as Admin");
        } else {
            errorMsg.textContent = "Uncorrect password for " + email;
        }
    } else {
        alert("You have logged as " + email);
    }
    return true; 
}

// FAQ (about.html)
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        button.classList.toggle('active');
    });
});


// Darkmode Toggle (everywhere)
const toggle = document.getElementById('darkmode-toggle');
toggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');

    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.footer').forEach(footer => {
        footer.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.btn-dark').forEach(btnDark => {
        btnDark.classList.toggle('btn-light');
    });

    document.querySelectorAll('.navbar').forEach(navbar => {
        navbar.classList.toggle('dark-mode');
    });
});