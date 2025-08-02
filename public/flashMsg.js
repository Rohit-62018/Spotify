window.addEventListener('DOMContentLoaded',()=>{
    const flash = document.querySelector('.flash-message');
    if (flash) {
      // Trigger slide in
      flash.classList.add('show');
      // Auto hide after 3 seconds
      setTimeout(() => {
        flash.classList.remove('show');
        // Optional: remove from DOM
        setTimeout(() => flash.remove(), 500);
      }, 3000);
    }
  } );

function view(){
    let flash = document.querySelector('.flash');
    if (flash) {
      // Trigger slide in
      flash.classList.add('show');
      // Auto hide after 3 seconds
      setTimeout(() => {
        flash.classList.remove('show');
        // Optional: remove from DOM
        setTimeout(() => flash.remove(), 500);
      }, 3000);
    }
  }

  // search bar hover border focus
  let box = document.querySelector('.box');
  document.addEventListener('click',(e)=>{
    if(!e.target.closest('.box')){
        box.classList.remove('focus');
    }else{
      box.classList.add('focus');
    }
  })
  
  
