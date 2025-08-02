const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

const signModal = document.getElementById('signModal');
const loginModal = document.getElementById('loginModal'); 

const targets = document.querySelectorAll('.blur');
const overlay = document.getElementById('overlay')

const logoutBtn = document.getElementById('logoutBtn')

if(logoutBtn){
  document.querySelector('.premium').style.display = 'none';
  document.querySelector('.home').style.marginLeft = "25vw";
}else{
  document.getElementById('trash').style.display = 'none';
}
 
// login process 
if (loginBtn) {
  loginBtn.addEventListener("click", viewLoginPage);
}

function viewLoginPage(){
  loginModal.classList.remove("hidden");
  targets.forEach(el => el.classList.add('blurred'));
  overlay.classList.remove('hidden');
}

// Sign-up process 
if( signupBtn){
  signupBtn.addEventListener('click',()=>{
    signModal.classList.remove("hidden");
    targets.forEach(el => el.classList.add('blurred'));
    overlay.classList.remove('hidden');
  })
} 
  
// cross button for remove login or signup page
const removeLogin = document.querySelector('.remove-login'); 
removeLogin.addEventListener('click',()=>{
    loginModal.classList.add("hidden");
    targets.forEach(el => el.classList.remove('blurred'));
    overlay.classList.add('hidden');
})

const removeSignup = document.querySelector('.remove-Signup'); 
removeSignup.addEventListener('click',()=>{
    signModal.classList.add("hidden");
    targets.forEach(el => el.classList.remove('blurred'));
    overlay.classList.add('hidden');
})


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
    }
});
