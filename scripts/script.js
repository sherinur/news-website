const adminLogin = "admin@example.com";
const adminPassword = "admin";

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

// Проверка сессии пользователя при загрузке страницы
function checkUserSession() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn === "true" && userEmail) {
        updateUIForLoggedInUser(userEmail);
    } else {
        updateUIForLoggedOutUser();
    }
}

// Функция для проверки формы и входа
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
        saveUserSession(email); // Сохраняем сессию
        updateUIForLoggedInUser(email);
    } else {
        errorMsg.textContent = "Incorrect email or password";
        applyErrorStyle(passwordElement);
        return false;
    }

    return true;
}

// Сохранение информации о пользователе в localStorage
function saveUserSession(email) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
}

// Функция для обновления интерфейса после входа
function updateUIForLoggedInUser(email) {
    const userName = document.querySelector(".userinfo__name");
    const loginButton = document.querySelector(".userinfo__login");
    const logoutButton = document.querySelector(".userinfo__logout");

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
}

// Функция для обновления интерфейса после выхода
function updateUIForLoggedOutUser() {
    const userName = document.querySelector(".userinfo__name");
    const loginButton = document.querySelector(".userinfo__login");
    const logoutButton = document.querySelector(".userinfo__logout");

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
}

// Выход из системы
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    alert("You have been logged out.");
    updateUIForLoggedOutUser();
}

// Сброс стилей поля
function resetStyles(element) {
    element.style.backgroundColor = "";
    element.style.border = "";
}

// Применение стиля ошибки
function applyErrorStyle(element) {
    element.style.backgroundColor = "#d36b6b";
    element.style.border = "1px solid #a00";
}

// Очистка сообщения об ошибке при изменении значений в полях
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
function initializeDarkMode() {
    const toggle = document.getElementById('darkmode-toggle');
    const darkModeClass = 'dark-mode';

    if (!toggle) return;

    if (localStorage.getItem('theme') === darkModeClass) {
        applyDarkMode(true);
        toggle.checked = true;
    }

    toggle.addEventListener('change', function() {
        const isDarkMode = toggle.checked;
        applyDarkMode(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? darkModeClass : 'light-mode');
    });

    function applyDarkMode(enable) {
        if (document.body) {
            document.body.classList.toggle(darkModeClass, enable);
        }

        const navbars = document.querySelectorAll('.navbar');
        if (navbars.length > 0) {
            navbars.forEach(navbar => {
                navbar.classList.toggle(darkModeClass, enable);
            });
        }

        const btnDarks = document.querySelectorAll('.btn-dark');
        if (btnDarks.length > 0) {
            btnDarks.forEach(btnDark => {
                btnDark.classList.toggle('btn-light', enable);
                btnDark.classList.toggle('btn-dark', !enable);
            });
        }

        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            cards.forEach(card => {
                card.classList.toggle(darkModeClass, enable);
            });
        }

        const footers = document.querySelectorAll('.footer');
        if (footers.length > 0) {
            footers.forEach(footer => {
                footer.classList.toggle(darkModeClass, enable);
            });
        }

        const user__info = document.querySelectorAll('.userinfo__name');
        if (user__info.length > 0) {
            user__info.forEach(footer => {
                footer.classList.toggle(darkModeClass, enable);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", initializeDarkMode);


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

// Posts Filter
function PostsFilterHandle() {
    document.addEventListener("DOMContentLoaded", function () {
        const buttons = document.querySelectorAll('.btn-info');
        const posts = document.querySelectorAll('.card-container');
        const activeFilters = new Set();

        const savedFilters = JSON.parse(localStorage.getItem('activeFilters')) || [];
        savedFilters.forEach(filter => activeFilters.add(filter));
        updateFilterButtons();
        filterPosts();

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

                localStorage.setItem('activeFilters', JSON.stringify([...activeFilters]));
                filterPosts();
            });
        });

        function filterPosts() {
            posts.forEach(post => {
                const badges = Array.from(post.querySelectorAll('.post-badge')).map(badge => badge.textContent.trim());
                const isVisible = [...activeFilters].every(filter => badges.includes(filter));

                post.style.display = activeFilters.size === 0 || isVisible ? 'block' : 'none';
            });
        }

        function updateFilterButtons() {
            buttons.forEach(button => {
                const filter = button.getAttribute('data-filter');
                if (activeFilters.has(filter)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
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