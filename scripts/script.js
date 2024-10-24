const adminLogin = "admin@example.com"
const adminPassword = "admin"

function validateForm() {
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
    const errorMsg = document.getElementById("errorMsg");
    
    resetStyles(emailElement);
    resetStyles(passwordElement);
    errorMsg.textContent = "";

    if (email === "" || password === "") {
        errorMsg.textContent = "All fields must be filled out";
        
        if (email === "") {
            applyErrorStyle(emailElement);
        }
        if (password === "") {
            applyErrorStyle(passwordElement);
        }
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Please enter a valid email address";
        applyErrorStyle(emailElement);
        return false;
    }

    if (email === adminLogin) {
        if (password === adminPassword) {
            alert("You have logged in as Admin");
        } else {
            errorMsg.textContent = "Incorrect password for " + email;
            applyErrorStyle(passwordElement);
            return false;
        }
    } else {
        alert("You have logged in as " + email);
    }

    return true; 
}

validateForm();

// Функция для сброса стилей поля
function resetStyles(element) {
    element.style.backgroundColor = "";
    element.style.border = "";
}

// Функция для применения стиля ошибки
function applyErrorStyle(element) {
    element.style.backgroundColor = "#d36b6b";
    element.style.border = "1px solid #a00";
}

// Очистка сообщения об ошибке при изменении значений в полях
document.getElementById("email").addEventListener("input", function() {
    resetStyles(this);
    document.getElementById("errorMsg").textContent = "";
});

document.getElementById("password").addEventListener("input", function() {
    resetStyles(this);
    document.getElementById("errorMsg").textContent = "";
});


// FAQ (about.html)
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        button.classList.toggle('active');
    });
});


// Darkmode Toggle (everywhere)
// Animations
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


// ! Assignment 5

// title h1 text changing 
function startTextRotation() {
    document.addEventListener('DOMContentLoaded', function () {
        let index = 0;
        const texts = ['THE BLOG', 'THE NEWS', "SHERI", 'NEW INFO'];
        const textElement = document.querySelector('#header-title');

        if (textElement) {
            function changeText() {
                textElement.textContent = texts[index];
                index = (index + 1) % texts.length;
            }

            changeText();
            setInterval(changeText, 10000);
        }
    });
}

startTextRotation();

// clear all buttons (Event Listeners on Buttons)

function clearLogin() {
    document.addEventListener('DOMContentLoaded', function () {
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                document.querySelectorAll('#myForm input').forEach(input => {
                    if (input.type === 'email' || input.type === 'password' || input.type === 'text') {
                        input.value = '';
                    }
                });
            });
        }
    });
}

clearLogin();

function toggleReadMore() {
    const toggleBtn = document.getElementById("toggleBtn");
    const moreContent = document.querySelector(".more-content");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            if (moreContent.style.display === "none") {
                moreContent.style.display = "inline";
                toggleBtn.textContent = "Read Less";
            } else {
                moreContent.style.display = "none";
                toggleBtn.textContent = "Read More";
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", toggleReadMore);

// Keyboard Event Handling
function HandleKeyboard() {
    document.addEventListener('keydown', function(event) {
        const menuItems = document.querySelectorAll('.navbar-nav .nav-link');
        let currentIndex = -1;
    
    
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i] === document.activeElement) {
                currentIndex = i;
                break;
            }
        }
    
        if (event.key === 'ArrowRight' && currentIndex < menuItems.length - 1) {
            menuItems[currentIndex + 1].focus();
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            menuItems[currentIndex - 1].focus();
        }
    });   
}

HandleKeyboard();

// Switch Statements
function PostsFilterHandle() {
    document.addEventListener("DOMContentLoaded", function () {
        const buttons = document.querySelectorAll('.btn-info');
        const posts = document.querySelectorAll('.card-container');
        const activeFilters = new Set();
    
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');
                
                if (activeFilters.has(filter)) {
                    activeFilters.delete(filter);
                    this.classList.remove('active');
                } else {
                    activeFilters.add(filter);
                    this.classList.add('active');
                }
    
                filterPosts();
            });
        });
    
        function filterPosts() {
            posts.forEach(post => {
                const badges = Array.from(post.querySelectorAll('.post-badge')).map(badge => badge.textContent.trim());
                const isVisible = [...activeFilters].every(filter => badges.includes(filter));
    
                if (activeFilters.size === 0 || isVisible) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        }
    });
}

PostsFilterHandle();

// Play Sounds
function ToggleSound() {
    document.getElementById('darkmode-toggle').addEventListener('click', function() {
        var audio = new Audio('./bell.mp3');
        audio.play();
    });
}

ToggleSound();