/* Haal favorieten uit localStorage */
export function krijgFavorieten() {
    return JSON.parse(localStorage.getItem('favorieten')) || [];
  }
  
/* Voeg toe of verwijder uit favorieten */
export function wisselFavoriet(anime) {
  var favorieten = krijgFavorieten();
  var index = favorieten.findIndex(function(fav) {
    return fav.mal_id === anime.mal_id;
  });
  if (index === -1) {
    favorieten.push({
      mal_id: anime.mal_id,
      title: anime.title,
      images: anime.images,
      url: anime.url
    });
  } else {
    favorieten.splice(index, 1);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}


/* Toon favorieten in zijbalk */
export function toonFavorietenZijbalk(wisselFavoriet, toonAnimeDetails) {
  var favorieten = krijgFavorieten();
  var favorietenDiv = document.getElementById('favoritesList');
  favorietenDiv.innerHTML = '';
  if (favorieten.length === 0) {
    favorietenDiv.innerHTML = '<p style="color:#b5838d;font-size:0.97rem;">No favorites yet.</p>';
  } else {
    favorieten.forEach(function(anime) {
      var favCard = document.createElement('div');
      favCard.classList.add('anime-card');
      favCard.style.height = 'auto';
      favCard.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <button class="fav-btn favorited" title="Toggle Favorite" data-id="${anime.mal_id}">❤️</button>
        <h4>${anime.title}</h4>
        <button class="details-btn" data-id="${anime.mal_id}">Details</button>
      `;
      favorietenDiv.appendChild(favCard);

      favCard.querySelector('.fav-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        wisselFavoriet(anime);
        toonFavorietenZijbalk(wisselFavoriet, toonAnimeDetails);
      });
      favCard.querySelector('.details-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        toonAnimeDetails(anime.mal_id);
      });
    });
  }
}

/* Hoofdscherm ("Show Favorites") */
export function toonFavorietenHoofd(wisselFavoriet, toonAnimeDetails) {
  var favorieten = krijgFavorieten();
  var animeLijst = document.getElementById('anime-list');
  animeLijst.innerHTML = '';
  if (favorieten.length === 0) {
    animeLijst.innerHTML = '<p style="color:#b5838d;font-size:1.1rem;">No favorites yet.</p>';
    return;
  }
  favorieten.forEach(function(anime) {
    var animeCard = document.createElement('div');
    animeCard.classList.add('anime-card', 'visible'); // direct zichtbaar
    animeCard.innerHTML = `
      <img src="${anime.images && anime.images.jpg && anime.images.jpg.large_image_url ? anime.images.jpg.large_image_url : 'https://via.placeholder.com/150x210?text=No+Image'}" alt="${anime.title}">
      <button class="fav-btn favorited" title="Toggle Favorite" data-id="${anime.mal_id}">❤️</button>
      <h4>${anime.title}</h4>
      <button class="details-btn" data-id="${anime.mal_id}">Details</button>
    `;
    animeLijst.appendChild(animeCard);

    animeCard.querySelector('.fav-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      wisselFavoriet(anime);
      toonFavorietenHoofd(wisselFavoriet, toonAnimeDetails);
    });
    animeCard.querySelector('.details-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      toonAnimeDetails(anime.mal_id);
    });
  });
}