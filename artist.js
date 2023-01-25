const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
window.onload = () => {
  getTrack("bruno-mars");
};

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

  let tbody = document.querySelector(".songlist-tbody");
  arrayOfSongs.forEach((singleSong) => {
    tbody.innerHTML += `
        <tr>
        <th scope="row">#</th>
        <td><img src="${singleSong.album.cover_small}" alt=""></td>            
        <td>${singleSong.title}</td>
        <td>${singleSong.album.id}</td>
        <td>${singleSong.duration}</td>
        </tr>
        `;
  });

  let artistpick = document.querySelector(".artist-pick-div");
  arrayOfSongs.slice(0, 1).forEach((singleSong) => {
    artistpick.innerHTML += `
        <div class="col-2 p-0 d-flex align-items-center">
        <img src="${singleSong.album.cover_small}" alt="${singleSong.artist.name}">
        <div>
        <p>Posted by ${singleSong.artist.name}</p>
        <p><span>${singleSong.artist.name} Best Of<span><br>Playlist<p>
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
