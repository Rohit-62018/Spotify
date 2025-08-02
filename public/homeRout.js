
const homeBtn = document.querySelector('.home');
homeBtn.addEventListener('click',async()=>{
    await axios.get(`/api/home`)
       .then(response => {
            contentInject(response.data);
        })
        .catch(err=>console.log(err));
})