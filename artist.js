const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id);
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
  let upperPartName = document.querySelector(".upper-artist h1");
  let listeners = document.querySelector(".listeners");
  arrayOfSongs.forEach((singleSong) => {
    upperPartName.innerText = `
        ${singleSong.artist.name}
        `;
    listeners.innerText = `
        ${singleSong.id * 2} monthly listeners
        `;
  });
  //song list
  let tbody = document.querySelector(".songlist-tbody");
  arrayOfSongs.forEach((singleSong, index) => {
    tbody.innerHTML += `
        <tr>
        <th scope="row"><i class="bi bi-bar-chart-fill text-success"></i><span>${
          index + 1
        }</span></th>
        <td><img src="${singleSong.album.cover_small}" alt=""></td>            
        <td>${singleSong.title}</td>
        <td>${singleSong.album.id}</td>
        <td>${formatTime(singleSong.duration)}</td>
        </tr>
        `;
  });
  //artist pick
  let artistpick = document.querySelector(".artist-pick-div");
  arrayOfSongs.slice(0, 1).forEach((singleSong) => {
    artistpick.innerHTML += `
        <div class="col p-0 d-flex align-items-center">
        <img src="${singleSong.album.cover_small}" alt="${singleSong.artist.name}">
        <div>
        <p>Posted by ${singleSong.artist.name} <br>
        <span>${singleSong.artist.name} Best Of<span><br>Playlist
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
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="bi bi-play-circle-fill"></i></span>
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
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="bi bi-play-circle-fill"></i></span>
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
          <span class="play-btn text-success" onclick ="playTrack(${singleSong.id})"><i class="bi bi-play-circle-fill"></i></span>
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
