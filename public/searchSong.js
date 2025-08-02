const flashMsg = document.querySelector('.flash')
// Song search 
let searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress',async(event)=>{
    if(event.key === 'Enter'){
        await axios.get(`/api/search-check?q=${encodeURIComponent(searchBar.value)}`)
            .then(response => {
                if (response.data.available === true) {
                    searchSongget();
                } else {
                    flashMsg.textContent = 'song not found';
                    view();
                }
        });
    }
})

async function searchSongget(){
    await axios.get(`/api/search?q=${encodeURIComponent(searchBar.value)}`)
       .then(response => {
            contentInject(response.data);
            searchBar.value='';
        })
        .catch(err=>console.log(err));
}

