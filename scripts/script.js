const adminLogin = "admin@example.com"
const adminPassword = "admin"

// Form Validation (login.html)
function validateForm() {
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const email = emailElement.value;
    const password = passwordElement.value;
    const errorMsg = document.getElementById("errorMsg");
    
    // Dynamic Style Changes 1
    if (password === "" || email === "") {
        errorMsg.textContent = "All fields must be filled out";
    
        if (password === "") {
            passwordElement.style.backgroundColor = "#d36b6b";
        }
    
        if (email === "") {
            emailElement.style.backgroundColor = "#d36b6b";
        }
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