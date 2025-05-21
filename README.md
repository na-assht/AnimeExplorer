// Projectbeschrijving //
Anime Explorer is een webapplicatie waarmee je populaire anime kunt zoeken, filteren op genre, favorieten kunt opslaan en info (details) van anime kunt bekijken. De app gebruikt de Jikan API en slaat favorieten op in LocalStorage.
Gebouwd met Vite, gescheiden HTML, CSS en JS.


// Gebruikte API //
https://api.jikan.moe/v4/anime/{id}/full


// Implementatie van elke technisch vereiste //

DOM manipulatie ->

/* Elementen selecteren: */
const animeLijst = document.getElementById('anime-list');
anime.js, lijn 2


/* Elementen manipuleren: */
animeLijst.innerHTML = ... in toonAnime()
anime.js, lijn 26


/* Events aan elementen koppelen: */
animeCard.querySelector('.fav-btn').addEventListener(...)
anime.js, lijn 37


/* Modern JavaScript: */
Gebruik van constanten:
const animeLijst = ...
anime.js, lijn 2


/* Template literals: */
animeCard.innerHTML = `
  <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
  ...
`;
anime.js, lijn 32


/* Iteratie over arrays: */
animes.forEach(function(anime) { ... })
anime.js, lijn 29


/* Array methodes: */
.forEach, .some, .findIndex, .push, .splice
favorites.js, lijnen 6, 10, 13


/* Arrow functions: */
Gebruikt in event listeners en array methodes, bijvoorbeeld:
categorieLijst.innerHTML = ''; data.data.slice(0, 15).forEach(genre => { ... });
categorieën.js


/* Conditional (ternary) operator: */
${isFav ? '❤️' : '🤍'}
anime.js, lijn 35


/* Callback functions: */
toonFavorieten(wisselFavoriet, toonAnimeDetails)
favorites.js, lijn 22


/* Promises: */
fetch(...).then(...).catch(...)
anime.js, lijn 7


/* Async & Await: */
async function haalPopulaireAnimeOpEnToon(...)
anime.js, lijn 6


/* Observer API: */
new IntersectionObserver(...)
anime.js, lijn 54 (na de forEach in toonAnime)



Data & API ->

/* Fetch om data op te halen: */
fetch('https://api.jikan.moe/v4/top/anime?limit=24')
anime.js, lijn 7

/* JSON manipuleren en weergeven: */
res.json().then(function(data) { ... })
anime.js, lijn 8



Opslag & validatie ->

/* Formulier validatie: */
if (zoekterm) { ... } controleert of het zoekveld niet leeg is
main.js, lijn 8

/* Gebruik van LocalStorage: *:
localStorage.setItem('favorieten', JSON.stringify(favorieten));
favorites.js, lijn 18



Styling & layout ->

/* Basis HTML layout: */
Zie index.html met <aside>, <main>, en CSS Grid in #anime-list
index.html, style.css

/* Basis CSS: */
Zie style.css voor kleuren, grid, knoppen, enz.

/* Gebruiksvriendelijke elementen: */
Hartje voor favorieten, details-knop, duidelijke foutmeldingen
anime.js, favorites.js, style.css



Tooling & structuur ->

/* Project opgezet met Vite: */
Zie vite.config.js, package.json

/* Correcte folderstructuur: */
Zie bovenstaand structuurvoorbeeld

/* GitHub repository: */
https://github.com/na-assht/AnimeExplorer 
Regelmatig gecommit, met duidelijke commit messages.



// Installatiehandleiding //

1. Ga naar de projectmap:  
   `cd anime-explorer`
2. Installeer de dependencies:  
   `npm install`
3. Start de ontwikkelserver:  
   `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in je browser.


// Screenshots van de applicatie //


// Gebruikte bronnen //
https://www.perplexity.ai/
https://chatgpt.com/
https://paiza.io/en
https://jsfiddle.net/
https://stackedit.io/app#
http://codetester.io/
https://www.google.com/?hl=nl 


