const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

const signModal = document.getElementById('signModal');
const loginModal = document.getElementById('loginModal'); 

const targets = document.querySelectorAll('.blur');
const overlay = document.getElementById('overlay')

const logoutBtn = document.getElementById('logoutBtn')
const Loginlink = document.querySelector('.Login-link');
const SignupLink = document.querySelector('.signup-link');

if(logoutBtn){
  document.querySelector('.premium').style.display = 'none';
  document.querySelector('.home').style.marginLeft = "25vw";
}else{
  document.getElementById('trash').style.display = 'none';
}
 
// login pge display 
if (loginBtn) {
  loginBtn.addEventListener("click", viewLoginPage);
}

// Sign-up pge display 
if(signupBtn){
  signupBtn.addEventListener('click',viewSignupPage);
} 

// cross button for  login or signup page
document.querySelector('.remove-login').addEventListener('click',crossLogin);
document.querySelector('.remove-Signup').addEventListener('click',removeSignup);

Loginlink.addEventListener('click',()=>{
  removeSignup();
  viewLoginPage();
})

SignupLink.addEventListener('click',(e)=>{
  crossLogin();
  viewSignupPage();
})

function viewLoginPage(){
  loginModal.classList.remove("hidden");
  targets.forEach(el => el.classList.add('blurred'));
  overlay.classList.remove('hidden');
}

function viewSignupPage(){
  signModal.classList.remove("hidden");
  targets.forEach(el => el.classList.add('blurred'));
  overlay.classList.remove('hidden');
}

function crossLogin(){
  loginModal.classList.add("hidden");
  targets.forEach(el => el.classList.remove('blurred'));
  overlay.classList.add('hidden');
}

function removeSignup(){
  signModal.classList.add("hidden");
  targets.forEach(el => el.classList.remove('blurred'));
  overlay.classList.add('hidden');
}

