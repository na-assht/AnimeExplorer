import { haalCategorieenOpEnToon } from './categories.js';
import { haalPopulaireAnimeOpEnToon, haalAnimeOpGenreEnToon, zoekAnimeEnToon, toonAnimeDetails } from './anime.js';
import { toonFavorieten, wisselFavoriet, krijgFavorieten } from './favorites.js';
import './style.css';

/* Linkerbalk */
const zoekKnop = document.getElementById('searchBtn');
const zoekVeld = document.getElementById('search');
const favorietenKnop = document.getElementById('showFavoritesBtn');
const homeKnop = document.getElementById('homeBtn');
const animeDetails = document.getElementById('anime-details');

let favorietenZichtbaar = false;

function wisselFavorietEnVervers(anime) {
  wisselFavoriet(anime);
  if (favorietenZichtbaar) {
    toonFavorieten(wisselFavorietEnVervers, toonAnimeDetails);
  }
}

zoekKnop.addEventListener('click', function() {
  const zoekterm = zoekVeld.value.trim();
  if (zoekterm) {
    zoekAnimeEnToon(zoekterm, wisselFavorietEnVervers, toonAnimeDetails, krijgFavorieten);
    verwijderActiefVanCategorieknoppen();
    favorietenZichtbaar = false;
  }
});

zoekVeld.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    zoekKnop.click();
  }
});

homeKnop.addEventListener('click', function() {
  haalPopulaireAnimeOpEnToon(wisselFavorietEnVervers, toonAnimeDetails, krijgFavorieten);
  verwijderActiefVanCategorieknoppen();
  favorietenZichtbaar = false;
});

favorietenKnop.addEventListener('click', function() {
  favorietenZichtbaar = true;
  toonFavorieten(wisselFavorietEnVervers, toonAnimeDetails);
});

animeDetails.addEventListener('click', function(e) {
  if (e.target === animeDetails) {
    animeDetails.classList.add('hidden');
  }
});

function verwijderActiefVanCategorieknoppen() {
  document.querySelectorAll('.category-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
}

/* Initialisatie */
haalCategorieenOpEnToon(function(genreId) {
  haalAnimeOpGenreEnToon(genreId, wisselFavorietEnVervers, toonAnimeDetails, krijgFavorieten);
  favorietenZichtbaar = false;
});
haalPopulaireAnimeOpEnToon(wisselFavorietEnVervers, toonAnimeDetails, krijgFavorieten);
toonFavorieten(wisselFavorietEnVervers, toonAnimeDetails);