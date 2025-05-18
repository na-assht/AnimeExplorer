import { krijgFavorieten } from './favorites.js';

const animeLijst = document.getElementById('anime-list');
const animeDetails = document.getElementById('anime-details');

export function haalPopulaireAnimeOpEnToon(wisselFavoriet, toonAnimeDetails, krijgFavorieten) {
  animeLijst.innerHTML = '<p>Loading...</p>';
  fetch('https://api.jikan.moe/v4/top/anime?limit=24')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      toonAnime(data.data, wisselFavoriet, toonAnimeDetails, krijgFavorieten);
    })
    .catch(function() {
      animeLijst.innerHTML = '<p>Error loading data. Try again later.</p>';
    });
}

export function haalAnimeOpGenreEnToon(genreId, wisselFavoriet, toonAnimeDetails, krijgFavorieten) {
  animeLijst.innerHTML = '<p>Loading...</p>';
  fetch('https://api.jikan.moe/v4/anime?genres=' + genreId + '&limit=24')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      toonAnime(data.data, wisselFavoriet, toonAnimeDetails, krijgFavorieten);
    })
    .catch(function() {
      animeLijst.innerHTML = '<p>Error loading data. Try again later.</p>';
    });
}

export function zoekAnimeEnToon(query, wisselFavoriet, toonAnimeDetails, krijgFavorieten) {
  animeLijst.innerHTML = '<p>Loading...</p>';
  fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(query) + '&limit=24')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      toonAnime(data.data, wisselFavoriet, toonAnimeDetails, krijgFavorieten);
    })
    .catch(function() {
      animeLijst.innerHTML = '<p>Error loading data. Try again later.</p>';
    });
}

export function toonAnime(animes, wisselFavoriet, toonAnimeDetails, krijgFavorieten) {
  animeLijst.innerHTML = '';
  if (!animes || animes.length === 0) {
    animeLijst.innerHTML = '<p>No results found.</p>';
    return;
  }
  var favorieten = krijgFavorieten();
  animes.forEach(function(anime) {
    var isFav = favorieten.some(function(fav) {
      return fav.mal_id === anime.mal_id;
    });
    var animeCard = document.createElement('div');
    animeCard.classList.add('anime-card');
    // HARTJE DIRECT NA DE AFBEELDING!
    animeCard.innerHTML = `
      <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
      <button class="fav-btn${isFav ? ' favorited' : ''}" title="Toggle Favorite" data-id="${anime.mal_id}">
        ${isFav ? '❤️' : '🤍'}
      </button>
      <h4>${anime.title}</h4>
      <button class="details-btn" data-id="${anime.mal_id}">Details</button>
    `;
    animeLijst.appendChild(animeCard);

    animeCard.querySelector('.fav-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      wisselFavoriet(anime);
      toonAnime(animes, wisselFavoriet, toonAnimeDetails, krijgFavorieten);
    });

    animeCard.querySelector('.details-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      toonAnimeDetails(anime.mal_id);
    });
  });
}

export function toonAnimeDetails(animeId) {
  animeDetails.innerHTML = '<div class="details-popup"><p>Loading...</p></div>';
  animeDetails.classList.remove('hidden');
  fetch('https://api.jikan.moe/v4/anime/' + animeId)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var anime = data.data;
      animeDetails.innerHTML = `
        <div class="details-popup">
          <button id="close-details">✖</button>
          <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
          <h2>${anime.title}</h2>
          <p>${anime.synopsis ? anime.synopsis.substring(0, 350) + (anime.synopsis.length > 350 ? '...' : '') : 'No synopsis available.'}</p>
          <p><b>Episodes:</b> ${anime.episodes || 'N/A'}</p>
          <p><b>Score:</b> ${anime.score || 'N/A'}</p>
          <a href="${anime.url}" target="_blank" rel="noopener noreferrer">View on MyAnimeList</a>
        </div>
      `;
      document.getElementById('close-details').onclick = function() {
        animeDetails.classList.add('hidden');
      };
    })
    .catch(function() {
      animeDetails.innerHTML = '<div class="details-popup"><p>Error loading details.</p><button id="close-details">✖</button></div>';
      document.getElementById('close-details').onclick = function() {
        animeDetails.classList.add('hidden');
      };
    });
}