
const audio = document.getElementById('audio');
const playbtn = document.querySelector('.playBtn');
const footerImg = document.getElementById('footerImg');
const songFixedTime = document.querySelector('.fix-time');
const songCurrentTime = document.querySelector('.current-time');
const footerMusic = document.querySelector('.first');
const volume = document.getElementById('volume');


if(!audio.src){
    document.querySelector('.player').style.opacity = 0.5;
    songFixedTime.textContent = '-:--';
    songCurrentTime.textContent = '--:-';
    footerMusic.style.pointerEvents = 'none';
}



async function audioPlayer(song){
    try{
        audio.pause();
        audio.currentTime = 0;
        audio.src = song.url;
        audio.load();
        footerMusic.style.pointerEvents = 'auto';
        document.querySelector('.footer-song').textContent = song.name;
        document.querySelector('.footer-singer').textContent = song.album;
        footerImg.src = song.image;

        // Update duration & slider after metadata is loaded
        audio.addEventListener('loadedmetadata',()=>{
            songFixedTime.textContent =  formatTime(audio.duration);
            document.getElementById('slider').max = Math.floor(audio.duration);
        })
        
        // Update slider and current time
           audio.addEventListener('timeupdate',()=>{
            document.getElementById('slider').value = audio.currentTime;
            songCurrentTime.textContent = formatTime(audio.currentTime);
            if(audio.ended){
              NextSong();
            }
        })

        // Allow seeking via slider
        const progressBar = document.getElementById('slider');
            progressBar.addEventListener('input',()=>{
            audio.currentTime = progressBar.value;
        })

        function updateIcon(){
            if (audio.paused) {
                playbtn.classList.remove('fa-circle-pause');
            } else {
                playbtn.classList.add('fa-circle-pause')
            }
        }
        
        // Auto-play the song 
        audio.play()
            .then(()=>{
                playbtn.classList.add('fa-circle-pause');
                document.querySelector('.player').style.opacity = 1;
        })
        .catch(err=>{
            console.error("Auto play failed",err.message);
        })
        audio.addEventListener('play', updateIcon);
        audio.addEventListener('pause', updateIcon); 
    }
    catch (err) {
        console.error("Play error:", err.message);
    }

    // Play/Pause toggle  
    playbtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playbtn.classList.add('fa-circle-pause');
        } else {
            audio.pause();
            playbtn.classList.remove('fa-circle-pause');
        }
    }; 
        
}
volume.addEventListener('change', () => {
    volumeIcon.style.opacity = 0.5;
});
  volume.addEventListener('input', () => {
                    audio.volume = volume.value;
                    document.getElementById('volumeIcon').style.opacity = 1;
                });
// 00:00 Time
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}


