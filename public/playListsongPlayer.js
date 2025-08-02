
const toggleBtn = document.querySelector('.toggle-playlist');
const playlistBox = document.querySelector('.playlist-box');
const dropdownIcon = toggleBtn.querySelector('.dropdown-icon');

// playlist show and hide
toggleBtn.addEventListener('click',()=>{        
    dropdownIcon.classList.toggle('rotate');      
    playlistBox.classList.toggle('show');
    document.getElementById('trash').classList.toggle('show');
})


// playlist song click event to play song
document.addEventListener('DOMContentLoaded',()=>{
    const playlistBox = document.querySelector('.playlist-box') 
    playlistBox.addEventListener('click',(e)=>{
        const song = e.target.closest('.individual-song');
        if (!song || !playlistBox.contains(song)) return;
        let data = {
            name: song.dataset.name,
            album: song.dataset.album,
            url: song.dataset.url,
            image: song.dataset.image,
        }
        document.querySelectorAll('#greenName-Green').forEach(name=>{
            name.style.color = "white";
        })
        audioPlayer(data);
        song.querySelector('#greenName-Green').style.color ='#43e326';
    })
})


    