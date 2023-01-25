// https://striveschool-api.herokuapp.com/api/deezer/search
//https://striveschool-api.herokuapp.com/api/deezer/album/

let spotifyDetails = document.getElementById("spotifyAlbumDetails")
let spotify = document.getElementById("spotifyAlbum")
let listOfAlbums = [];
let listOfSongs= [];



const getSpotifyDetails = (query) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
  .then(response => response.json())
  .then(response => renderAlbumDetails(response.data, spotifyDetails))
  .catch(err => console.error(err));

  const renderAlbumDetails = (fetchedAlbum, location) => {
    let albumDetails = document.createElement("div");
   


 //for (let i = 0; i < fetchedAlbum.length; i++) {
  //albumDetails.innerHTML += `<img${fetchedAlbum[0].album.cover_medium}/>`
      albumDetails.innerHTML += `<img src="${fetchedAlbum[0].album.cover_medium}"/>`
      listOfAlbums.push(fetchedAlbum[0].album.cover_medium);
      listOfAlbums.push(fetchedAlbum[0].album);
  //}
   albumDetails.innerHTML+=""
    location.appendChild(albumDetails);
}


}

// dermotkennedy
// let query = "dermot kennedy"

const getSpotify = (query) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then(response => response.json())
    .then(response => renderAlbum(response.data, spotify))
    .catch(err => console.error(err));
}

const renderAlbum = (fetchedAlbum, location) => {
    let album = document.createElement("tbody");
    //album.innerHTML += "<h2>Artist Name</h2>"
    for (let i = 0; i < fetchedAlbum.length; i++) {
        //album.innerHTML += `<li><img src="${fetchedAlbum[i].album.cover_medium}"/>${fetchedAlbum[i].title}</li>`
        album.innerHTML += `<tr><th></th>
        <td>${fetchedAlbum[i].title}</td>
        <td>${fetchedAlbum[i].artist.name}</td>
        <td>${(fetchedAlbum[i].duration/60).toFixed(2)}</td></tr>`
        listOfAlbums.push(fetchedAlbum[i].album.cover);
        listOfAlbums.push(fetchedAlbum[i].title);

  

    }
    album.innerHTML+=""
    location.appendChild(album);
}


window.onload = function(){
    getSpotify("Hip Hop");
    getSpotifyDetails("Hip Hop");
}



