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
    
    document.querySelectorAll('.navbar').forEach(navbar => {
        navbar.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.btn-dark').forEach(btnDark => {
        btnDark.classList.toggle('btn-light');
        btnDark.classList.toggle('btn-dark');
    });

    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.footer').forEach(footer => {
        footer.classList.toggle('dark-mode');
    });
});


function updateDateTime() {
    const now = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDateTime = now.toLocaleString('en-US', options);

    document.getElementById('date-time').textContent = `${formattedDateTime}`;
}   

setInterval(updateDateTime, 1000);

// ! Assignment 5

// title h1 text changing 
function startTextRotation() {
    let index = 0;
    const texts = ['THE BLOG', 'THE NEWS', "WHAT'S NEW", 'NEW INFO'];

    function changeText() {
        const textElement = document.querySelector('#header-title');
        textElement.textContent = texts[index];
        index = (index + 1) % texts.length;
    }

    changeText();
    setInterval(changeText, 10000);
}

document.addEventListener('DOMContentLoaded', startTextRotation);


// clear all buttons (Event Listeners on Buttons)

function clearLogin() {
    document.getElementById('clearBtn').addEventListener('click', function() {
        document.querySelectorAll('#myForm input').forEach(input => {
            if (input.type === 'email' || input.type === 'password' || input.type === 'text') {
                input.value = '';
            }
        });
    });
}

clearLogin();