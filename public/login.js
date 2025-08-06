const loginName = document.getElementById('login-name');
const loginPass = document.getElementById('login-pass');
const formSubmit = document.getElementById('formBtn');
const loginForm = document.getElementById('loginForm');

formSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const data = {
        username: loginName.value,
        password: loginPass.value
    };
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.valid === false) {
            flashMsg.textContent = 'Invalid username or password';
            view();
        } else {
            window.location.href = '/api';
        }
    } catch (err) {
        console.error("Login failed:", err);
        flashMsg.textContent = 'Server error. Try again later.';
        view();
    }
});
