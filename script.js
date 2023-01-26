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

let sections = [
  "good-morning-sec",
  "recent-played-sec",
  "shows-to-try-sec",
  "exclusives-sec",
];

$(window).scroll(function () {
  $(".top-bar").toggleClass("scrolled", $(this).scrollTop() > 320);
});

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

//render cards
const renderCards = (tracks, section, playable, displayAll = false) => {
  let container = document.getElementById(section);
  console.log(tracks, section);
  let trackCards;

  trackCards = tracks.map((track) => {
    globalTracks.push(track);
    return `<div class="col mb-4">
        <div class="card h-100" id="${track.album.id}">
          <div class="play-btn-container">
            <img src="${track.album.cover_medium}" class="card-img-top" alt="..." onclick = "onCardClick(event)">
            <span class="play-btn text-success bg-transparent" onclick ="playTrack(${track.id})"><i class="play-icon bi bi-play-circle-fill"></i></span>
          </div>
          <div class="card-body">
            <h5 class="card-title">${track.album.title}</h5>
            <p class="card-text text-muted mt-n2"><small>${track.artist.name}</small></p>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = trackCards.join("");
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

//time format
const formatTime = (duration) => {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  return `${minutes}:${seconds}`;
};

//good-morning section
const renderGoodMorning = (arrayOfSongs) => {
  let container = document.querySelector(".good-morning-div");
  container.innerHTML = "";
  arrayOfSongs.slice(0, 10).forEach((singleSong) => {
    container.innerHTML += `
      <div class="col-2 m-3 p-0 good-morning-content d-flex align-items-center">
      <img class="col-5 pl-0 good-morning-img " src="${singleSong.album.cover_medium}" alt="">
      <div class="good-morning-singer">${singleSong.artist.name}</div>
      </div>
      `;
  });
};

//card fetching and rendering
const getSection = async (searchQuery, section, playable) => {
  let tracks = await getTrackDetails(searchQuery);
  renderCards(tracks.slice(0, 5), section, playable);
};

//to album page
const onCardClick = (event) => {
  let selectedAlbumId = event.target.closest(".card").id;
  window.location.href = `./album.html?id=${selectedAlbumId}`;
};

const loadSections = async () => {
  document.getElementById("input").classList.add("d-none");
  sections.forEach((section) => {
    document.getElementById(section).classList.remove("d-none");
  });
  document.getElementById("search-result-sec").classList.add("d-none");
  getSection("pop", "recent-played", false);
  getSection("podcasts", "shows-to-try", true);
  getSection("mix", "exclusives", true);

  const goodMorningTracks = await getTrackDetails("morning");
  renderGoodMorning(goodMorningTracks);
};

const showAll = async (section, searchQuery) => {
  console.log(section);
  let tracks = await getTrackDetails(searchQuery);
  sections.forEach((item) => {
    console.log(section, item);
    if (item != section) {
      document.getElementById(item).classList.add("d-none");
    }
  });
  renderCards(tracks, section.substring(0, section.length - 4), true, true);
};

const searchBarVisible = () => {
  document.getElementById("input").classList.remove("d-none");
};

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

window.onload = () => {
  loadSections();
};
