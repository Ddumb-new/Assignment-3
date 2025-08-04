const apiKey = "586977141f88506e20022ed171e90860"; 
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query !== "") {
    fetchMovies(query);
  }
});

// Fetch movies from TMDb
async function fetchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    resultsDiv.innerHTML = `<p>Error fetching data</p>`;
  }
}

// Display movies on page
function displayMovies(movies) {
  resultsDiv.innerHTML = "";

  if (movies.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";

    card.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>⭐ Rating: ${movie.vote_average}</p>
      <p>${movie.overview.substring(0, 100)}...</p>
    `;

    resultsDiv.appendChild(card);
  });
}
