'use strict';

document.addEventListener('DOMContentLoaded', function() {
    getQuotes();
});

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