const footerSong = document.querySelector('.first')
footerSong.addEventListener('click',()=>{
    if(SongList){
    contentInject(SongList);
    highlightCurrentSong(currentIdx);
    }
})