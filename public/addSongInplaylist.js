// add song in playlist (DOM)
function addSong(){
    document.querySelectorAll('.add-icon').forEach(icon=>{
    icon.addEventListener('click',(e)=>{
        e.stopPropagation(); 
        const songDiv = icon.closest('.songDiv');
        if(!songDiv) return;
        let songData = {
            name: songDiv.dataset.name,
            album: songDiv.dataset.album,
            url: songDiv.dataset.url,
            image: songDiv.dataset.image,
        }
        addsongInPlayList(songData);
        icon.style.border ='1px solid #43e326';
        addNewelement(songData);
    })
})
}

// create new song  element  and add in playlist
function addNewelement(newSong){
    const html = `<div class="individual-song" draggable="true"
    data-image="${newSong.image}" data-url="${newSong.url}"
    data-album="${newSong.album}" data-name="${newSong.name}" data-id="${newSong.id}">
    
    <div class="playlist-img"><img src='${newSong.image}' alt=""></div>
    <div class="sond-info">
      <div><p id="greenName-Green">${newSong.name}</p></div>
      <div class="eclips"><p>${newSong.album}</p></div>
    </div>
  </div>`;
  document.querySelector('.playlist-box').insertAdjacentHTML('beforeend', html);
  
}

// Update new added song in DB
function addsongInPlayList(songData){
    fetch('/api/addSong',{
        method:'POST',
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(songData)
    })
    .then((data)=>data.json())
    .catch(err=>console.log(err));
}