const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
let globalTracks = [];
let audioPlayer = null;
let selectedTrackIndex = null;
const getTrackDetails = async (searchQuery) => {
  try {
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
        searchQuery,
      options
    );
    let tracks = await res.json();
    console.log(tracks);
    return tracks.data;
  } catch (err) {
    console.log(err);
  }
};



const playTrack = (trackId) => {
  selectedTrackIndex = globalTracks.findIndex((track) => track.id === trackId);
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

const onClickNext = () => {
  selectedTrackIndex++;
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

const onClickPrev = () => {
  selectedTrackIndex--;
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

const onPlayPause = (event) => {
  let button = event.target;
  if (button.classList.contains("fa-play")) {
    button.classList.remove("fa-play");
    button.classList.add("fa-pause");
    loadTrack(globalTracks[selectedTrackIndex]);
  } else {
    button.classList.remove("fa-pause");
    button.classList.add("fa-play");
    audioPlayer.pause();
  }
};

const loadTrack = (selectedTrack) => {
  let image = document.getElementById("album-art");
  let title = document.getElementById("album-title");
  let artistName = document.getElementById("album-artist");
  let time = document.getElementById("time-over");
  let duration = document.getElementById("time-remaining");

  image.src = selectedTrack.album.cover_small;
  title.innerText = selectedTrack.album.title;
  artistName.innerText = selectedTrack.artist.name;
  duration.innerText = formatTime(selectedTrack.duration);
  console.log(selectedTrack);
  console.log(selectedTrack.preview);
  if (audioPlayer != null) {
    audioPlayer.pause();
  }

  let button = document.getElementById("play-pause-btn");
  button.classList.remove("fa-play");
  button.classList.add("fa-pause");
  audioPlayer = new Audio(selectedTrack.preview);
  audioPlayer.play();
};

const formatTime = (duration) => {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  return `${minutes}:${seconds}`;
};


const getSection = async (searchQuery, section, playable) => {
  let tracks = await getTrackDetails(searchQuery);
  renderCards(tracks.slice(0, 5), section, playable);
};



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
    albumDetails.classList.add("createdFlex")


 //for (let i = 0; i < fetchedAlbum.length; i++) {
  //albumDetails.innerHTML += `<img${fetchedAlbum[0].album.cover_medium}/>`
      albumDetails.innerHTML += `<img src="${fetchedAlbum[0].album.cover_medium}"/>
      <div class="everWhat mx-4">
        <div class="d-flex whatEver">
          <h6>Album</h6>
          <h3>${fetchedAlbum[0].album.title}</h3>
        </div>
        <div class="d-flex align-items-baseline">
          <div class="mx-1">
            <img id="smallArtistIconPicture" src="${fetchedAlbum[0].artist.picture}"/>
          </div>
          <div class="mx-1">
           <p>${fetchedAlbum[0].artist.name}</p>
          </div>
          <div class="mx-1">
            <p>2018</p>
            </div>
          <div class="mx-1">
            <p>${fetchedAlbum.length} songs</p>
          </div>
          <div class="mx-1">
            <p>1 hr 29 mins</p>
          </div>
          </div>
        </div>
      </div>`
      listOfAlbums.push(fetchedAlbum[0].album.cover_medium);
      listOfAlbums.push(fetchedAlbum[0].album);
  //}
   albumDetails.innerHTML+=""
    location.appendChild(albumDetails);
}


}
//https://striveschool-api.herokuapp.com/api/deezer/album/
//`https://striveschool-api.herokuapp.com/api/deezer/album/search?q=${query}
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
    album.innerHTML += `<th scope="col" class="grey">#</th>
    <th scope="col" class="col-10 grey">Title</th>
    <!--<th scope="col" class="col-2"></th>--> 
    <th id="test" scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock grey" viewBox="0 0 16 16">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
      </svg></th>
`
    for (let i = 0; i < fetchedAlbum.length; i++) {
        //album.innerHTML += `<li><img src="${fetchedAlbum[i].album.cover_medium}"/>${fetchedAlbum[i].title}</li>`
        album.innerHTML += 
        `
        <tr class="container">
        <td class="row ml-1">${i + 1}</td>
        <td class="col-12 ml-5">${fetchedAlbum[i].title}<p class="name-select">${fetchedAlbum[i].artist.name}</p></td>
        <td>${(fetchedAlbum[i].duration/60).toFixed(2)}</td></tr>`
        listOfAlbums.push(fetchedAlbum[i].album.cover);
        listOfAlbums.push(fetchedAlbum[i].title);

  

    }
    album.innerHTML+=""
    location.appendChild(album);
}


window.onload = function(){
    getSpotify("Bohemian Rhapsody (The Original Soundtrack)")
    getSpotifyDetails("Bohemian Rhapsody (The Original Soundtrack)");
}




