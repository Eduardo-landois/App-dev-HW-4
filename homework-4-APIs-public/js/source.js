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
localStorage.setItem("api_key", "e999bfaca804498f9a61619f30c12d55");



async function load(){
    
        let gameID = localStorage.getItem("game_id");
        let apiKey = localStorage.getItem("api_key");

}

load();




   