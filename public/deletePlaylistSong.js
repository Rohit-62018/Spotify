const trash = document.getElementById('trash');

playlistBox.addEventListener('dragstart', function (e) {
  const song = e.target.closest('.individual-song');
  if (!song || !playlistBox.contains(song)) return;
  const songId = song.getAttribute('data-id');
  if (songId) {
    e.dataTransfer.setData('text/plain', songId);
  }
});
trash.addEventListener('dragover', function (e) {
  e.preventDefault();
});

trash.addEventListener('drop', (e) => {
  e.preventDefault();
  const songId = e.dataTransfer.getData('text/plain');

  if (!songId) {
    console.error("No songId received from drag.");
    return;
  }
  const songToRemove = playlistBox.querySelector(`[data-id="${songId}"]`);
  if (songToRemove) songToRemove.remove();
  
  fetch(`/api/delete/${songId}`, { method: 'DELETE' })
    .catch(err => console.error(err.message));
});