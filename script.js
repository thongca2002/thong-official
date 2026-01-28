const API_KEY = "AIzaSyCsxtAacHZNMFwzcoODKsDPjZF5KC8tQEI";
const CHANNEL_ID = "UC4jdAkaD_bbavlenTLS_JfQ";

let videos = [];

fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12`)
  .then(res => res.json())
  .then(data => {
    videos = data.items;
    render(videos);
  });

function render(list) {
  const box = document.getElementById("videos");
  box.innerHTML = "";

  list.forEach(v => {
    if (!v.id.videoId) return;

    box.innerHTML += `
      <div class="video">
        <a href="https://www.youtube.com/watch?v=${v.id.videoId}" target="_blank">
          <img src="${v.snippet.thumbnails.medium.url}">
        </a>
        <h3>${v.snippet.title}</h3>
      </div>
    `;
  });
}

function searchVideo() {
  const key = document.getElementById("search").value.toLowerCase();
  render(videos.filter(v => v.snippet.title.toLowerCase().includes(key)));
}
