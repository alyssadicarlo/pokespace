'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = window.location.search;
    const pokemon = searchInput.slice(9,searchInput.length);
    let gender = "";

    function generateRandomMood() {
        const listOfMoods = ['happy \n😊', 'peachy \n😌', 'sad \n😭', 'romantic \n🥰', 'reflective \n🤔', 'cheerful \n😁', 'shocked \n😮', 'worried \n😰'];

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
        }).catch((error) => {
            console.log(error);
            return error;
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
        const abilitiesSelectElement = document.querySelector('#pokemonAbilities');
        const firstAbilityElement = abilities[0].ability.url;
        fetchAbilityStats(firstAbilityElement);

        abilities.forEach((ability) => {
            const optionElement = document.createElement('option');
            optionElement.value = ability.ability.url;
            optionElement.innerText = ability.ability.name;
            abilitiesSelectElement.append(optionElement);
        });

        abilitiesSelectElement.addEventListener('change', (event) => {
            const url = event.target.value;
            fetchAbilityStats(url);
        })

        const moves = pokemonData.moves;
        const movesSelectElement = document.querySelector('#pokemonMoves');
        const firstMoveElement = moves[0].move.url;
        fetchMoveStats(firstMoveElement);
        
        moves.forEach((move) => {
            const optionElement = document.createElement('option');
            optionElement.value = move.move.url;
            optionElement.innerText = move.move.name;
            movesSelectElement.append(optionElement);
        });

        movesSelectElement.addEventListener('change', (event) => {
            const url = event.target.value;
            fetchMoveStats(url);
        })

        // GAMES - not using right now

        // const games = data.game_indices;

        // const gamesTitle = document.createElement('p');
        // gamesTitle.innerText = "Games appeared in";
        // pokemonStats_2.append(gamesTitle);

        // const gamesListElement = document.createElement('ul');
        // games.forEach((game) => {
        //     const listItem = document.createElement('li');
        //     listItem.innerText = game.version.name;
        //     gamesListElement.append(listItem);
        // });

        // pokemonStats_2.append(gamesListElement);
    
        fetchPokemonDescription(pokemonData.id);
        fetchPokemonSpeciesInfo(pokemonData.species.url);
    }

    function fetchAbilityStats(url) {
        fetch(
            url
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updateAbilityStats(data);
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }

    function updateAbilityStats(data) {
        const effect = document.querySelector('#abilityEffect');
        effect.innerText = data.effect_entries[1].effect;
    }

    function fetchMoveStats(url) {
        fetch(
            url
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updateMoveStats(data);
        });
    }

    function updateMoveStats(data) {
        const effect = document.querySelector('#moveEffect');
        const type = document.querySelector('#type');
        const power = document.querySelector('#power');
        const accuracy = document.querySelector('#accuracy');
        const damageClass = document.querySelector('#damage');
        const pp = document.querySelector('#pp');

        effect.innerText = data.effect_entries[0].effect;
        type.innerText = data.type.name;
        power.innerText = data.power;
        accuracy.innerText = data.accuracy;
        damageClass.innerText = data.damage_class.name;
        pp.innerText = data.pp;
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
        });
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
        }).catch((error) => {
            console.log(error);
            return error;
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
            const genderlessPokemonData = data.pokemon_species_details;

            let genderlessPokemon = [];

            genderlessPokemonData.forEach((pokemon) => {
            genderlessPokemon.push((pokemon.pokemon_species.name));
            });

            console.log(genderlessPokemon);

            const isGenderless = genderlessPokemon.includes(pokemon);
            if (isGenderless === true) {
                gender = "genderless";
                updatePokemonGender();
            } else {
                generateRandomGender();
            }
        }).catch((error) => {
            console.log(error);
            return error;
        })
    }

    function updatePokemonGender() {

        const pokemonGender = document.querySelector('#pokemonGender');
    
        pokemonGender.innerText = gender;
    }

    function generateRandomGender() {
        const genders = ['female', 'male'];

        const randomIndex = Math.floor(Math.random() * genders.length);
        gender = genders[randomIndex];
        updatePokemonGender();
    }

    fetchPokemonDetails();
    generateRandomMood();
    fetchPokemonGender(3);

});