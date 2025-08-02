const container = document.getElementById('content');  

async function loadSongs(songName,url){
        const encodeSongName = encodeURIComponent(songName);
        const encodeurl = encodeURIComponent(url);
        const response = await axios.get(`/api/music?q=${encodeSongName}&Url=${encodeurl}`) 
        contentInject(response.data);
}
let SongList;
function contentInject(response){ 
    
    try{
        container.innerHTML = response;
        setTimeout(()=>{
            songObjreceiver();
            const img = document.querySelector('#Img');
            if(!img){
                console.log ("Image not found");
                return;
            }
            changeColor = ()=> {
                try{
                    const colorThief = new ColorThief();
                    const color = colorThief.getColor(img);
                    const dominatedcolour = `rgb(${color.join(',')})`
                    document.querySelector('.headList').style.backgroundColor = dominatedcolour;
                }catch(err){
                    console.error("failed to extract color:",err);
                }
            }
            if(img.complete){
                changeColor();
            }
            img.addEventListener("load",changeColor) ;
            formatAllDurations();
            extractSongsData(); 
            addSong(); 
            
        },200)
    }
    catch(err){
        console.error('Error',err);
    }
}

function formatAllDurations() {
    document.querySelectorAll('.Duration').forEach(p => {
        const seconds = parseInt(p.dataset.duration); 
        if (!isNaN(seconds)) {
            p.innerText = formatTime(seconds);
        } else {
            p.innerText = "--:--";
        }
    });
}
 function songObjreceiver(){
    document.querySelectorAll('.songDiv').forEach(songDiv=>{
        songDiv.addEventListener("click",()=>{
            const songData = {...songDiv.dataset};
            fetch(`/api/isAuthenticated`)
                .then(data=>data.json())
                .then(res =>{
                    if(res.valid){
                        audioPlayer(songData);
                        SongList = container.innerHTML; 
                        currentIdx = songData.idx;
                        highlightCurrentSong(songData.idx);  
                    }else{
                        flashMsg.textContent = 'You must login';
                        view();
                        viewLoginPage();
                    }
                })
                .catch(err=>console.log(err.message));
        })
    })
 }


