// *********************************************************************
// Homework 4 Public APIs
// *********************************************************************

function formatYearFromStr(dateString) {
  return dateString.split('-')[0];
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}

localStorage.setItem("game_id", "42913");
localStorage.setItem("api_key", "the api key goes here");



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
        document.querySelector("#game-title").textContent = game.title;
        const heroImage = document.querySelector("#hero-image");
        heroImage.src = game.cover_url;
        heroImage.alt = game.title;

        document.querySelector('.game-meta').textContent = 
        `${game.developer} • ${formatYearFromStr(game.release_date)}`;

        document.querySelector('.game-genre').textContent = game.genre

        

          
        
}

load();




   