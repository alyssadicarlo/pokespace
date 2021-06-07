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
            console.log('The data is: ', data)
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

function getQuotes() {
    const min = Math.ceil(0);
    const max = Math.floor(70);
    const randomPage = Math.floor(Math.random() * (max - min) + min)
    fetch(`https://animechan.vercel.app/api/quotes/anime?title=Pok%C3%A9mon&page=${randomPage}`)
        .then(function(response) {
            // Listens for the RESPONSE from the fetch() - Promise #1
            return response.json();
        })
        .then(function(data) {
            // Listens for the DATA from response.json() - Promise #2
            console.log('The data is: ', data)
            const randomQuote = data[0].quote;
            const quoteName = data[0].character;
            const randomQuoteP = document.querySelector('#randomQuote');
            randomQuoteP.innerHTML = '"' + randomQuote + '" -' + quoteName
            return data;
        })
        .catch(function(error) {
            // Listens for a REJECTION from the fetch() promise
            console.error('ERROR:', error);
            return error;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const min = Math.ceil(1);
    const max = Math.floor(900);
    const randomPokemon = Math.floor(Math.random() * (max - min) + min)
    getRandomImage();
    getQuotes();
});