const songs = document.querySelectorAll('.individual-song');
const trash = document.getElementById('trash');

songs.forEach(song =>{
  song.addEventListener('dragstart',function(e){
    const songId = song.getAttribute('data-id')
    e.dataTransfer.setData('text/plain', songId);
  })
})

trash.addEventListener('dragover',function(e){
    e.preventDefault();
})

trash.addEventListener('drop',(e)=>{
        e.preventDefault();
        const songId = e.dataTransfer.getData('text/plain');
        const songToremove = document.querySelector(`[data-id="${songId}"]`);
        console.log(songToremove);
        if(songToremove) songToremove.remove();
        fetch(`/api/delete/${songId}`,{method:'DELETE'})
            .catch(err=>console.error(err.message));

})