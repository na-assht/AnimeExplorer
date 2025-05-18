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
  export function toonFavorieten(wisselFavoriet, toonAnimeDetails) {
    var favorieten = krijgFavorieten();
    var favorietenDiv = document.getElementById('favoritesList');
    var animeLijst = document.getElementById('anime-list');
  
    /* Zijbalk */
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
          var mal_id = anime.mal_id;
          var favAnime = favorieten.find(function(fav) {
            return fav.mal_id === mal_id;
          });
          wisselFavoriet(favAnime);
          toonFavorieten(wisselFavoriet, toonAnimeDetails);
        });
        favCard.querySelector('.details-btn').addEventListener('click', function(e) {
          e.stopPropagation();
          toonAnimeDetails(anime.mal_id);
        });
      });
    }
  
    /* Hoofdscherm ("Show Favorites") */
    animeLijst.innerHTML = '';
    if (favorieten.length === 0) {
      animeLijst.innerHTML = '<p style="color:#b5838d;font-size:1.1rem;">No favorites yet.</p>';
      return;
    }
    favorieten.forEach(function(anime) {
      var animeCard = document.createElement('div');
      animeCard.classList.add('anime-card');
      
      animeCard.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <button class="fav-btn favorited" title="Toggle Favorite" data-id="${anime.mal_id}">❤️</button>
        <h4>${anime.title}</h4>
        <button class="details-btn" data-id="${anime.mal_id}">Details</button>
      `;
      animeLijst.appendChild(animeCard);
  
      animeCard.querySelector('.fav-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        var mal_id = anime.mal_id;
        var favAnime = favorieten.find(function(fav) {
          return fav.mal_id === mal_id;
        });
        wisselFavoriet(favAnime);
        toonFavorieten(wisselFavoriet, toonAnimeDetails);
      });
      animeCard.querySelector('.details-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        toonAnimeDetails(anime.mal_id);
      });
    });
  }