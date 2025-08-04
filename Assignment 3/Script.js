
const API_KEY = "586977141f88506e20022ed171e90860";

// Handle search
document
  .getElementById("search-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) {
      fetchMovies(query);
    }
  });

// Fetch movies based on search query
async function fetchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url);
  const data = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  data.results.forEach((movie) => {
    if (movie.poster_path) {
      const movieDiv = document.createElement("div");
      movieDiv.className = "movie-item";

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt = movie.title;

      img.addEventListener("click", () => showMovieDetails(movie));

      movieDiv.appendChild(img);
      resultsDiv.appendChild(movieDiv);
    }
  });
}

// Show detailed info in modal
function showMovieDetails(movie) {
  const detailsDiv = document.getElementById("movie-details");
  detailsDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
    `;
  document.getElementById("movie-modal").classList.remove("hidden");
}

// Close modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("movie-modal").classList.add("hidden");
});

// Slideshow images for background
const backgroundImages = [
  "https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
  "https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
  "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
  "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
];

let currentBackgroundIndex = 0;

function changeBackgroundImage() {
  const slideshow = document.getElementById("background-slideshow");
  slideshow.style.backgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;
  currentBackgroundIndex =
    (currentBackgroundIndex + 1) % backgroundImages.length;
}

// Start the slideshow
changeBackgroundImage();
setInterval(changeBackgroundImage, 5000);
