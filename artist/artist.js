const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id);

let globalTracks = [];
let audioPlayer = null;
let selectedTrackIndex = null;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const extractName = async () => {
  try {
    let res = await fetch(url + id, options);
    let tracks = await res.json();
    console.log(tracks.name);
    getTrack(tracks.name);
  } catch (error) {}
};

window.onload = async () => {
  extractName();
};

//top-bar
$(window).scroll(function () {
  $(".top-bar").toggleClass("scrolled", $(this).scrollTop() > 500);
});

const getTrack = async (searchQuery) => {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`,
      options
    );
    let tracks = await res.json();
    console.log(tracks);
    renderPlaylist(tracks.data);
    renderAlbum(tracks.data);
    getTrack(tracks.data);
  } catch (err) {
    console.log(err);
  }
};

const formatTime = (duration) => {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  return `${minutes}:${seconds}`;
};

const renderPlaylist = (arrayOfSongs) => {
  let upperPartName = document.querySelector("h1");
  let listeners = document.querySelector(".listeners");
  arrayOfSongs.forEach((singleSong) => {
    upperPartName.innerText = `${singleSong.artist.name}`;
    listeners.innerText = `
        ${(singleSong.id * 2).toLocaleString("en-US")} monthly listeners
        `;
  });
  //song list
  let tbody = document.querySelector(".songlist-tbody");
  arrayOfSongs.slice(0, 5).forEach((singleSong, index) => {
    globalTracks.push(singleSong);
    tbody.innerHTML += `
        <tr class="row d-flex justify-content-center" onclick ="playTrack(${
          singleSong.id
        })">
        <th class="col-1" scope="row"><i class="bi bi-bar-chart-fill text-success"></i><span>${
          index + 1
        }</span></th>
        <td class="col-2"><img src="${
          singleSong.album.cover_small
        }" alt=""></td>            
        <td class="col-4">${singleSong.title}</td>
        <td class="col-2">${singleSong.album.id.toLocaleString("en-US")}</td>
        <td class="col-2">${formatTime(singleSong.duration)}</td>
        </tr>
        `;
  });

  //see more

  //artist pick
  let artistpick = document.querySelector(".artist-pick-div");
  arrayOfSongs.slice(0, 1).forEach((singleSong) => {
    artistpick.innerHTML += `
        <div class="col p-0 d-flex align-items-center">
        <img src="${singleSong.album.cover_small}" alt="${singleSong.artist.name}">
        <div class="artist-pick-content ml-2 mt-3">
        <p>Posted by ${singleSong.artist.name} <br>
        <span>${singleSong.artist.name} Best Of</span><br>Playlist
        </p>
        </div>
        `;
  });

  let popular = document.querySelector(".popular");
  let albums = document.querySelector(".albums");
  let singles = document.querySelector(".singles");
  arrayOfSongs.slice(0, 5).forEach((singleSong) => {
    popular.innerHTML += `<div class="col mb-4">
        <div class="card h-100" id="${singleSong.album.id}">
        <div class="play-btn-container">
          <img src="${singleSong.album.cover_medium}" class="card-img-top" alt="...">
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="play-icon bi bi-play-circle-fill"></i></span>
        </div>
          <div class="card-body">
            <h5 class="card-title">${singleSong.album.title}</h5>
            <p class="card-text">${singleSong.artist.name}</p>
          </div>
        </div>
      </div>`;
    albums.innerHTML += `<div class="col mb-4">
        <div class="card h-100" id="${singleSong.album.id}">
        <div class="play-btn-container">
          <img src="${singleSong.album.cover_medium}" class="card-img-top" alt="...">
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="play-icon bi bi-play-circle-fill"></i></span>
        </div>
          <div class="card-body">
            <h5 class="card-title">${singleSong.album.title}</h5>
            <p class="card-text">${singleSong.artist.name}</p>
          </div>
        </div>
      </div>`;

    singles.innerHTML += `<div class="col mb-4">
        <div class="card h-100" id="${singleSong.album.id}">
        <div class="play-btn-container">
          <img src="${singleSong.album.cover_medium}" class="card-img-top" alt="...">
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="play-icon bi bi-play-circle-fill"></i></span>
        </div>
          <div class="card-body">
            <h5 class="card-title">${singleSong.album.title}</h5>
            <p class="card-text">${singleSong.artist.name}</p>
          </div>
        </div>
      </div>`;
  });

  let background = document.querySelector("#cover-image");
  arrayOfSongs.forEach((singleSong) => {
    background.style.backgroundImage = `url('${singleSong.album.cover_xl}')`;
  });
};

const playPauseBtn = (event) => {
  let button = event.target;
  if (button.classList.contains("bi-play-circle-fill")) {
    button.classList.remove("bi-play-circle-fill");
    button.classList.add("bi-pause-circle-fill");
    let selectedTrack = globalTracks[0];
    loadTrack(selectedTrack);
  } else {
    button.classList.remove("bi-pause-circle-fill");
    button.classList.add("bi-play-circle-fill");
    audioPlayer.pause();
  }
};

//music player track details
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

//find track index
const playTrack = (trackId) => {
  selectedTrackIndex = globalTracks.findIndex((track) => track.id === trackId);
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

//on click next on play track
const onClickNext = () => {
  selectedTrackIndex++;
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

//on click previous on play track
const onClickPrev = () => {
  selectedTrackIndex--;
  let selectedTrack = globalTracks[selectedTrackIndex];
  loadTrack(selectedTrack);
};

//pause and play
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

//to make search btn visible
const searchBarVisible = () => {
  document.getElementById("input").classList.remove("d-none");
};

//search musics
const searchMusic = async () => {
  let search = document.querySelector("#search-input").value;
  if (search.length >= 4) {
    sections.forEach((section) => {
      document.getElementById(section).classList.add("d-none");
    });
    document.getElementById("search-result-sec").classList.remove("d-none");
    let tracks = await getTrackDetails(search);
    renderCards(tracks, "search-result", true, true);
  }
};

document
  .getElementById("search-input")
  .addEventListener("keypress", searchMusic);
