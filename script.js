const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
let songs = [];

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

const renderCards = (tracks, section) => {
  let container = document.getElementById(section);
  let trackCards = tracks.map((track) => {
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

  container.innerHTML = trackCards.join("");
};

const getSection = async (searchQuery, section) => {
  let tracks = await getTrackDetails(searchQuery);
  renderCards(tracks.slice(0, 5), section);
};

const onCardClick = (event) => {
  console.log(event);
  let selectedAlbumId = event.target.closest(".card").id;
  window.location.href = `./album.html?id=${selectedAlbumId}`;
};

const loadSections = () => {
  getSection("pop", "recent-played");
  getSection("podcasts", "show-to-try");
  getSection("mix", "spotify");
};

window.onload = loadSections();
