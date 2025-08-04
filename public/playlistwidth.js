
const resizable = document.querySelector('.side-container');
const resizer = resizable.querySelector('.resizer');

resizer.addEventListener('mousedown', function (e) {
  e.preventDefault();
  resizer.style.cursor = 'grabbing';
  document.body.style.cursor = 'grabbing';

  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);

  function resize(e) {
    const newWidth = e.clientX - resizable.getBoundingClientRect().left;

    const el1 = document.querySelector('.createPlayList');
    const heading = resizable.querySelector('h6');

    if(newWidth < 220) {
      resizable.style.width = '1rem';
      if (el1) el1.style.display = 'none';
      if (heading) heading.style.display = 'none';
    } 
    else {
        resizable.style.width = newWidth + 'px';
        if (el1) el1.style.display = 'block'; 
        if (heading) heading.style.display = 'block';
      }
  }
    function stopResize() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
      resizer.style.cursor = 'grab';
      document.body.style.cursor = 'default';
    }
});

