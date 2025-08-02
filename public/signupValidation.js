const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
  
   usernameInput.addEventListener('change',()=>{
          
      fetch(`/api/check-username?username=${encodeURIComponent(usernameInput.value)}`)
        .then(res => res.json())
        .then(data => {
         const feetback = document.querySelector('.invalid');
         feetback.textContent = data.available ? "" :" Username already taken"  // { available: true } or { available: false }
         feetback.style.color = data.available? "green" :"red"
         if(!data.available){
            const button = document.getElementById('signup-Btn');
            button.disabled = true;
            button.style.opacity = 0.6
         }else{
            const button = document.getElementById('signup-Btn');
            button.disabled = false;
            button.style.opacity = 1;
         }
       })
    .catch(err => console.error('Fetch error:', err));
   })