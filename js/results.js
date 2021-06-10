'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = window.location.search;
    const pokemon = searchInput.slice(9, searchInput.length);
    let gender = "";

    function generateRandomMood() {
        const listOfMoods = ['Happy \n😊', 'Peachy \n😌', 'Sad \n😭', 'Romantic \n🥰', 'Reflective \n🤔', 'Cheerful \n😁', 'Shocked \n😮', 'Worried \n😰'];

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
        const baseExperience = document.querySelector('#baseExperience');
        const pokedexNumber = document.querySelector('#pokedexNumber');
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
        pokemonSpecies.innerText = `${pokemonData.species.name.slice(0,1).toUpperCase()}${pokemonData.species.name.slice(1, pokemonData.species.name.length)}`;

        baseExperience.innerHTML = `Base EXP: ${pokemonData.base_experience}</br>
        Base HP: ${pokemonData.stats[0].base_stat}</br>
        Base Def: ${pokemonData.stats[2].base_stat}</br>
        Base Sp. Def: ${pokemonData.stats[4].base_stat}`;

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

        const games = data.game_indices;
        const randomIndex = Math.floor(Math.random() * games.length);
        let randomGame = games[randomIndex].version.name;
        randomGame = randomGame.replace('-', ' ');
        const randomGameElement = document.querySelector('#pokemonRandomGame');
        randomGameElement.innerHTML = `Currently playing: Pokémon ${randomGame.slice(0,1).toUpperCase()}${randomGame.slice(1,randomGame.length)}`;

        pokedexNumber.innerText = `Pokédex #: ${pokemonData.id}
        Base Att: ${pokemonData.stats[1].base_stat}
        Base Sp. Att: ${pokemonData.stats[3].base_stat}
        Base Spd: ${pokemonData.stats[5].base_stat}`;

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
        const effectData = data.effect_entries;
        effectData.forEach((effectItem) => {
            if (effectItem.language.name === "en") {
                effect.innerText = effectItem.effect;
            };
        });
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
        type.innerText = `${data.type.name.slice(0,1).toUpperCase()}${data.type.name.slice(1,data.type.name.length)}`;
        power.innerText = data.power;
        accuracy.innerText = data.accuracy;
        damageClass.innerText = `${data.damage_class.name.slice(0,1).toUpperCase()}${data.damage_class.name.slice(1,data.damage_class.name.length)}`;
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
        pokemonColor.innerText = `${data.color.name.slice(0,1).toUpperCase()}${data.color.name.slice(1, data.color.name.length)}`;
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

            const isGenderless = genderlessPokemon.includes(pokemon);
            if (isGenderless === true) {
                gender = "Genderless";
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
        const genders = ['Female', 'Male'];

        const randomIndex = Math.floor(Math.random() * genders.length);
        gender = genders[randomIndex];
        updatePokemonGender();
    }

    fetchPokemonDetails();
    generateRandomMood();
    fetchPokemonGender(3);

});