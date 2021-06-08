'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = window.location.search;
    const pokemon = searchInput.slice(9,searchInput.length);

    function generateRandomMood() {
        const listOfMoods = ['happy 😊', 'peachy 😌', 'sad 😭', 'romantic 🥰', 'reflective 🤔', 'cheerful 😁', 'shocked 😮', 'worried 😰'];

        const randomIndex = Math.floor(Math.random() * listOfMoods.length);

        const pokemonMood = document.querySelector('#pokemonMood');
        pokemonMood.innerText = `Mood: ${listOfMoods[randomIndex]}`;
    }
    
    function fetchPokemonDetails() {
        fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updatePokemonDetails(data);
        })
    };

    function updatePokemonDetails(data) {
        const pokemonData = data;
        const pokemonImage = document.querySelector('#pokemonImage');
        const pokemonName = document.querySelector('#pokemonName');
        const pokemonHeight = document.querySelector('#pokemonHeight');
        const pokemonWeight = document.querySelector('#pokemonWeight');
        const pokemonStats = document.querySelector('#pokemonStats');
        const pokemonStats_2 = document.querySelector('#pokemonStats2')
        const pokemonSpecies = document.querySelector('#pokemonSpecies');

        if (pokemonData.sprites.other.dream_world.front_default !== null) {
            pokemonImage.src = pokemonData.sprites.other.dream_world.front_default;
        } else if (pokemonData.sprites.front_default !== null) {
            pokemonImage.src = pokemonData.sprites.front_default;
        } else {
            pokemonImage.src = 'images/not_found.jpg';
        }

        pokemonName.innerHTML = `<strong>${pokemonData.forms[0].name.slice(0,1).toUpperCase()}${pokemonData.forms[0].name.slice(1,pokemonData.forms[0].name.length)}</strong>`;
        pokemonHeight.innerText = (pokemonData.height * 10) + ' cm';
        pokemonWeight.innerText = Math.round((pokemonData.weight / 4.536)) + ' lb';
        pokemonSpecies.innerText = pokemonData.species.name;

        const baseExperience = document.createElement('p');
        baseExperience.innerHTML = `Base experience: ${pokemonData.base_experience}`;
        pokemonStats.append(baseExperience);

        const abilities = pokemonData.abilities;

        const abilityTitle = document.createElement('p');
        abilityTitle.innerText = "Abilities";
        pokemonStats.append(abilityTitle);

        const abilityListElement = document.createElement('ul');
        abilities.forEach((ability) => {
            const listItem = document.createElement('li');
            listItem.innerText = ability.ability.name;
            abilityListElement.append(listItem);
        });

        pokemonStats.append(abilityListElement);

        const moves = data.moves;

        const movesTitle = document.createElement('p');
        movesTitle.innerText = "Moves";
        pokemonStats.append(movesTitle);
        
        const movesListElement = document.createElement('ul');
        moves.forEach((move) => {
            const listItem = document.createElement('li');
            listItem.innerText = move.move.name;
            movesListElement.append(listItem);
        });

        pokemonStats.append(movesListElement);

        const games = data.game_indices;

        const gamesTitle = document.createElement('p');
        gamesTitle.innerText = "Games appeared in";
        pokemonStats_2.append(gamesTitle);

        const gamesListElement = document.createElement('ul');
        games.forEach((game) => {
            const listItem = document.createElement('li');
            listItem.innerText = game.version.name;
            gamesListElement.append(listItem);
        });

        pokemonStats_2.append(gamesListElement);
    
        fetchPokemonDescription(pokemonData.id);
        fetchPokemonSpeciesInfo(pokemonData.species.url);
        fetchPokemonGender(pokemonData.id);
    }

    function fetchPokemonDescription(id) {
        fetch(
            `https://pokeapi.co/api/v2/characteristic/${id}`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updatePokemonDescription(data);
        }).catch((error) => {
            return error;
        })
    }

    function updatePokemonDescription(data) {
        const pokemonDescription = document.querySelector('#pokemonDescription');

        pokemonDescription.innerText = `Status: ${data.descriptions[2].description}`;
    }

    function fetchPokemonSpeciesInfo(url) {
        fetch(
            url
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updatePokemonColor(data);
        })
    }

    function updatePokemonColor(data) {
        const pokemonColor = document.querySelector('#pokemonColor');
        pokemonColor.innerText = data.color.name;
    }

    function fetchPokemonGender(id) {
        fetch(
            `https://pokeapi.co/api/v2/gender/${id}`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updatePokemonGender(data);
        }).catch((error) => {
            updatePokemonGender({
                name: "Unknown gender"
            });
            return error;
        })
    }

    function updatePokemonGender(data) {

        const pokemonGender = document.querySelector('#pokemonGender');

        const gender = data.name;
        pokemonGender.innerText = gender;
    }

    fetchPokemonDetails();
    generateRandomMood();

});