import { haalFavorietenOp } from './favorites';

const animeLijst = document.getElementById ('anime-lijst');
const animeDetails = document.getElementById ('anime-details');


// Populaire Anime tonen //
export function haalenToonPopulaireAnime (wisselFavorieten, toonAnimeInfo, haalFavorietenOp) {
    animeLijst.innerHTML = '<p>Laden...</p>';
    fetch ('https://api.jikan.moe/v4/top/anime?limit=24')
    .then (antwoord => antwoord.json ())
    .then (data => {
        toonAnime (data.data, wisselFavorieten, toonAnimeInfo, haalFavorietenOp);
    })
    .catch (() => {
        animeLijst.innerHTML = '<p>Fout bij het laden van de gegevens. Prbeer later opnieuw.</p>';
    });
}

// Anime tonen van categorieën //
export function haalenToonANimePerGenre (gengreId, wisselFavorieten, toonAnimeInfo, haalFavorietenOp) {
    animeLijst.innerHTML = '<p>Laden...</p>';
    fetch ('`https://api.jikan.moe/v4/anime?genres=${genreId}&limit=24')
    .then (antwoord => antwoord.json())
    .then (data => {
        toonAnime (data.data, wisselFavorieten,toonAnimeInfo, haalFavorietenOp)
    })
    .catch (() => {
        animeLijst.innerHTML = '<p>Fout bij het laden van de gegevens. Probeer later opnieuw.</p>';
    })
}