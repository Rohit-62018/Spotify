const nextSong = document.querySelector('.fa-forward-step')
const previousSong = document.querySelector('.fa-backward-step');
let songList;
let currentIdx;

nextSong.addEventListener('click',NextSong);
previousSong.addEventListener('click',PreviousSong);

// next song
function NextSong(){
    if(songList.length > currentIdx){
        audioPlayer(songList[++currentIdx - 1]);
        highlightCurrentSong(currentIdx);
        
    }else
        console.log("Over-flow");
};

// previous song
function PreviousSong(){
    if(currentIdx > 1){
        audioPlayer(songList[--currentIdx-1]);
        highlightCurrentSong(currentIdx);
    }
};


function extractSongsData(){
    const songElements = document.querySelectorAll('.songDiv');
        const songDataList = Array.from(songElements).map(el => ({
            name: el.dataset.name,
            album: el.dataset.album,
            url: el.dataset.url,
            image: el.dataset.image,
            idx: el.dataset.idx
        }));
        songList = songDataList;
}

function highlightCurrentSong(idx){

    document.querySelectorAll('.nameGreen').forEach( h5=>{
        h5.style.color = "white";
    })
     document.querySelectorAll('#greenName-Green').forEach( name=>{
        name.style.color = "white";
    })
    
    const matchedSongDiv = Array.from(document.querySelectorAll('.songDiv')).find(div=>
        div.dataset.idx == idx
    )

    if(matchedSongDiv){
        h5 = matchedSongDiv.querySelector('.nameGreen');
        h5.style.color = '#43e326';
    }
    
}
