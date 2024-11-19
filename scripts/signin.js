document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    errorMsg.textContent = '';
    successMsg.style.display = 'none';

    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Invalid email format.';
        return;
    }

    if (!passwordRegex.test(password)) {
        errorMsg.textContent = 'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
        return;
    }

    const account = { email, password };
    localStorage.setItem('userAccount', JSON.stringify(account));

    successMsg.style.display = 'block';
    document.getElementById('myForm').reset();
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('myForm').reset();
    document.getElementById('errorMsg').textContent = '';
    document.getElementById('successMsg').style.display = 'none';
});
