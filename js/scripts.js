'use strict';

function getRandomImage() {
    const min = Math.ceil(1);
    const max = Math.floor(900);
    const randomPokemon = Math.floor(Math.random() * (max - min) + min)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const randomImage = data.sprites.front_default;
            const randomImageDiv = document.querySelector('#randomImageDiv');
            randomImageDiv.innerHTML = "<img src='" + randomImage + "'>";
            return (data);
        })
        .catch(function(error) {
            console.error('ERROR: ', error);
            return error;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const min = Math.ceil(1);
    const max = Math.floor(900);
    const randomPokemon = Math.floor(Math.random() * (max - min) + min)
    getRandomImage();
});