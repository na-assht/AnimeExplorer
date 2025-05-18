export function haalCategorieenOpEnToon(bijKlik) {
    var categorieLijst = document.getElementById('category-list');
    fetch('https://api.jikan.moe/v4/genres/anime')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        categorieLijst.innerHTML = '';
        data.data.slice(0, 15).forEach(function(genre) {
          var li = document.createElement('li');
          li.innerHTML = '<button class="category-btn" data-genreid="' + genre.mal_id + '">' + genre.name + '</button>';
          categorieLijst.appendChild(li);
        });
        document.querySelectorAll('.category-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(function(b) {
              b.classList.remove('active');
            });
            btn.classList.add('active');
            bijKlik(btn.getAttribute('data-genreid'));
          });
        });
      })
      .catch(function() {
        categorieLijst.innerHTML = '<li>Error loading categories</li>';
      });
  }