'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const datalist = document.querySelector('datalist');
    const searchInput = document.querySelector('#searchInput');
    let pokemon = [];

    searchInput.addEventListener('keyup', () => {
        if (searchInput.value) {
            datalist.id = "pokemonList";    		
        } else {
            datalist.id = "";
        }
    });

    function fetchPokemon() {
        fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            addPokemonToList(data);
        });
    }

    function addPokemonToList(data) {
        const pokemonData = data.results;
                
        pokemonData.forEach((item) => {
            pokemon.push(item.name);
        });

        updatePokemonSelectElement();
    }

    function updatePokemonSelectElement() {

        pokemon.forEach((item) => {
            const optionElement = document.createElement('option');
            optionElement.value = item;
            optionElement.innerText = item;

            datalist.append(optionElement);
        });
    }

    fetchPokemon();
});