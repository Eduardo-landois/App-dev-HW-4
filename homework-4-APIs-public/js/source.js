// *********************************************************************
// Homework 4 Public APIs
// *********************************************************************

function formatYearFromStr(dateString) {
  return dateString.split('-')[0];
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}
                 //  ID for Crusader Kings III
localStorage.setItem("game_id", "11710");
localStorage.setItem("api_key", "e1e1bc67adc7474d8dd4e78637e5caf2");



async function load(){
    
        let gameID = localStorage.getItem("game_id");
        let apiKey = localStorage.getItem("api_key");
        
        const base = `https://api.gamebrain.co/v1/games/${gameID}`;

        // game details json
        const gameResponse = await fetch(`https://api.gamebrain.co/v1/games/${gameID}?api-key=${apiKey}`);
        const game = await gameResponse.json();

        // news json
        const newsResponse = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/news?api-key=${apiKey}`);
        const news = await newsResponse.json();

        // similar games json
        const similarResponse = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/similar?limit=4&api-key=${apiKey}`);
        const similar = await similarResponse.json();

        console.log(game);
        console.log(news);
        console.log(similar);


        // changing Hero section
        document.querySelector("#game-name").textContent = game.name;

        const heroImage = document.querySelector(".game-image img");
        heroImage.src = game.image;
        heroImage.alt = game.name;

        // make the image of the hero section fit box nest to title
        heroImage.style.width = "420px";
        heroImage.style.maxWidth = "100%";
        heroImage.style.height = "auto";
        heroImage.style.aspectRatio = game.image_aspect_ratio;
        heroImage.style.objectFit = "cover";

        document.querySelector(".game-meta").textContent =
          `${game.developer} • ${formatYearFromStr(game.release_date)}`;

        document.querySelector(".game-genre").textContent = game.genre;

        // Changing News section 
        let newsItems = news.news;


        if (!newsItems || newsItems.length === 0) {
          const backupResponse = await fetch(`https://api.gamebrain.co/v1/games/1261640/news?api-key=${apiKey}`);
          const backup = await backupResponse.json();
          newsItems = backup.news;
        }

        const newsCards = document.querySelectorAll('.news-card');

        newsCards.forEach((card, i) => {
          const item = newsItems[i];

          if (!item) {
            card.style.display = 'none';
            return;
          }

          card.querySelector('img').src = item.image;
          card.querySelector('img').alt = item.title;
          card.querySelector('h3').textContent = item.title;
          card.querySelector('.news-published').textContent = `Published ${item.published}`;
        });

        // Changing the similar games section
        const similarGames = similar.results;
        const gameCards = document.querySelectorAll('.game-card');

        gameCards.forEach((card, i) => {
          const sg = similarGames[i];

          if (!sg) {
            card.style.display = 'none';
            return;
          }

          card.querySelector('img').src = sg.screenshots[0] || sg.image;
          card.querySelector('img').alt = sg.name;
          card.querySelector('h3').textContent = sg.name;

          const metaSpans = card.querySelectorAll('.game-card-meta span');
          metaSpans[0].textContent = Math.trunc(sg.year);
          metaSpans[1].textContent = formatPercentage(sg.rating.mean);
        });
        
}

load();




   