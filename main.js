import { haalenToonCategorieën } from './categories.js';
import {
    haalenToonPopulaireAnime,
    haalenToonANimePerGenre,
    haalenToonAnimeViaZoeken,
    toonAnimeInfo
} from './anime.js';
import {
    toonFavorieten,
    wisselFavorieten,
    haalFavorietenOp
} from './favorites.js';


// Linkerbalk //
const zoekKnop = document.getElementById ('zoekKnop');
const zoekInvoer = document.getElementById ('zoeken');
const toonFavorietKnop = document.getElementById ('toonFavorietKnop');
const homeKnop = document.getElementById ('homeKnop');
const animeDetails = document.getElementById ('anime-details');

let toonFavorieten = false;