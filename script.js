const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
let globalTracks = [];

const getTrackDetails = async (searchQuery) => {
  try {
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
        searchQuery,
      options
    );
    let tracks = await res.json();
    return tracks.data;
  } catch (err) {
    console.log(err);
  }
};

const renderCards = (tracks, section, playable) => {
  let container = document.getElementById(section);
  let trackCards;
  if (!playable) {
    trackCards = tracks.map((track) => {
      globalTracks.push(track);
      return `<div class="col mb-4">
        <div class="card h-100" id="${track.album.id}" onclick = "onCardClick(event)">
          <img src="${track.album.cover_medium}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${track.album.title}</h5>
            <p class="card-text">${track.artist.name}</p>
          </div>
        </div>
      </div>`;
    });
  } else {
    trackCards = tracks.map((track) => {
      globalTracks.push(track);
      return `<div class="col mb-4">
        <div class="card h-100" id="${track.album.id}">
        <div class="play-btn-container">
          <img src="${track.album.cover_medium}" class="card-img-top" alt="...">
          <span class="play-btn text-success" onclick ="playTrack(${track.id})"><i class="bi bi-play-circle-fill"></i></span>
        </div>
          <div class="card-body">
            <h5 class="card-title">${track.album.title}</h5>
            <p class="card-text">${track.artist.name}</p>
          </div>
        </div>
      </div>`;
    });
  }

  container.innerHTML = trackCards.join("");
};
const playTrack = (trackId) => {
  let image = document.getElementById("album-art");
  let title = document.getElementById("album-title");
  let artistName = document.getElementById("album-artist");
  let time = document.getElementById("time-over");
  let duration = document.getElementById("time-remaining");
  let selectedTrack = globalTracks.find((track) => track.id === trackId);
  image.src = selectedTrack.album.cover_small;
  title.innerText = selectedTrack.album.title;
  artistName.innerText = selectedTrack.artist.name;
  duration.innerText = selectedTrack.duration;

  console.log(selectedTrack);
};
const getSection = async (searchQuery, section, playable) => {
  let tracks = await getTrackDetails(searchQuery);
  renderCards(tracks.slice(0, 5), section, playable);
};

const onCardClick = (event) => {
  console.log(event);
  let selectedAlbumId = event.target.closest(".card").id;
  window.location.href = `./album.html?id=${selectedAlbumId}`;
};

const loadSections = () => {
  getSection("pop", "recent-played", false);
  getSection("podcasts", "show-to-try", false);
  getSection("mix", "spotify", true);
};

window.onload = loadSections();
