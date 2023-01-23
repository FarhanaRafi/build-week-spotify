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
    console.log(tracks);
    renderGoodMorning(tracks.data);
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

const renderGoodMorning = (arrayOfSongs) => {
  let container = document.querySelector(".good-morning-div");
  container.innerHTML = "";
  arrayOfSongs.slice(0, 10).forEach((singleSong) => {
    container.innerHTML += `
      <div class="col-2 m-3 p-0 good-morning-content d-flex align-items-center">
      <img class="col-5 pl-0 good-morning-img " src="${singleSong.album.cover_medium}" alt="">
      <div>${singleSong.artist.name}r</div>
      </div>
  
  
      `;
  });
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
  getSection("2022", "recent-played");
  getSection("podcasts", "show-to-try");
};

window.onload = () => {
  loadSections();
};
