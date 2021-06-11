'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = window.location.search;
    const pokemon = searchInput.slice(9, searchInput.length).toLowerCase();
    document.title = `PokéSpace | ${pokemon.slice(0,1).toUpperCase()}${pokemon.slice(1,pokemon.length)}`;
    let gender = "";
    let pokemonList = [];

    if (pokemon === 'sean') {
        window.location.href = "sean.html";
    } else if (pokemon === 'sam') {
        window.location.href = "sam.html";
    } else if (pokemon === 'zach') {
        window.location.href = "zach.html";
    } else if (pokemon == 'alyssa') {
        window.location.href = "alyssa.html";
    } else if (pokemon === 'otis') {
        window.location.href = "otis.html";
    } else if (pokemon === 'josh') {
        window.location.href = "josh.html";
    }

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
            if (!item.name.includes("-")) {
                pokemonList.push(item.name);
            }
        });

        checkValid();

        generateRandomFriends();
    }

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
        });
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
        updateIcon(pokemonData.id);
        fetchPokemonDescription(pokemonData.id);
        fetchPokemonSpeciesInfo(pokemonData.species.url);
        updatePokemonTypes(pokemonData.types);
    }

    function updatePokemonTypes(typesData) {
        const pokemonCharacterisitics = document.querySelector('#pokemonCharacteristics');
        typesData.forEach((type) => {
            const listItem = document.createElement('li');
            listItem.classList.add('hoverable_list__item');
            const icon = document.createElement('img');
            icon.src = "images/type.svg";
            icon.alt = "type-icon";
            icon.classList.add('characteristics__image');
            const listTitle = document.createElement('span');
            listTitle.classList.add('characteristics__large_text');
            listTitle.innerHTML = '<strong>Type</strong>';
            const typeElement = document.createElement('p');
            typeElement.innerText = `${type.type.name.slice(0,1).toUpperCase()}${type.type.name.slice(1,type.type.name.length)}`;

            listItem.append(icon);
            listItem.append(listTitle);
            listItem.append(typeElement);
            pokemonCharacterisitics.append(listItem);
        });

        calculateHeight();
    }

    function calculateHeight() {
        const column1 = document.querySelector('#column1');
        const column2 = document.querySelector('#column2');
        column2.style.minHeight = `${column1.offsetHeight}px`;
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

    function updateIcon(id) {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function fetchFriendInfo(friend, id) {
        fetch(
            `https://pokeapi.co/api/v2/pokemon/${friend}`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updateFriendInfo(data, id);
        }).catch((error) => {
            console.log(error);
            return error;
        })
    }

    function updateFriendInfo(data, id) {
        const friendsElement = document.querySelector(`#pokemonFriend${id}`);
        friendsElement.classList.remove('loader');

        const friendElement = document.createElement('div');
        friendElement.classList.add('text-center');

        const friendNameElement = document.createElement('div');
        friendNameElement.classList.add('friend_name');

        const online_offline = ['online', 'offline'];

        const onlineDiv = document.createElement('div');
        onlineDiv.classList.add('online');

        const offlineDiv = document.createElement('div');
        offlineDiv.classList.add('offline');

        const rand = Math.floor(Math.random() * online_offline.length);

        if (rand === 0) {
            friendNameElement.append(onlineDiv);
        } else {
            friendNameElement.append(offlineDiv);
        }

        const friendImage = document.createElement('img');
        friendImage.classList.add('friend__image');

        friendImage.src = data.sprites.front_default;

        const friendName = document.createElement('span');
        let name = data.name.replace("-"," ");
        friendName.innerText = name;

        friendNameElement.append(friendName);

        friendElement.append(friendNameElement);
        friendElement.append(friendImage);

        friendsElement.append(friendElement);
    }

    function generateRandomFriends() {
        const randIndex1 = Math.floor(Math.random() * pokemonList.length);
        const randIndex2 = Math.floor(Math.random() * pokemonList.length);
        const randIndex3 = Math.floor(Math.random() * pokemonList.length);

        const friend1 = pokemonList[randIndex1];
        const friend2 = pokemonList[randIndex2];
        const friend3 = pokemonList[randIndex3];

        fetchFriendInfo(friend1, 1);
        fetchFriendInfo(friend2, 2);
        fetchFriendInfo(friend3, 3);
    }

    window.addEventListener('resize', (event) => {
        const resizeCol = document.querySelector('#resizeCol');
        if (event.target.innerWidth <= 1215) {
            resizeCol.classList.remove('is-one-third');
        }

        if (event.target.innerWidth > 1215) {
            resizeCol.classList.add('is-one-third');
        }
    });
    
    fetchPokemon();
    generateRandomMood();
    fetchPokemonGender(3);
    fetchPokemonDetails();

});