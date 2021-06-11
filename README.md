## PokéSpace
This app is a play on the popular social media site MySpace. The user can search for a specific Pokémon and view many details about the Pokémon that we view as important to gameplay.

## Live Version
A live version of this site can be viewed at [alyssadicarlo.github.io/pokepsace](https://alyssadicarlo.github.io/pokespace/)

## Motivation
This app was created as a group project in the DigitalCrafts May 2021 full stack web development bootcamp.

## Screenshots
<img src="">

## Tech/framework used
- HTML5
- CSS3
- Vanilla JavaScript
- [Bulma](https://bulma.io/)

## Features
- Search for Pokémon
- View Pokémon characteristics & statistics

## Statistics Included
- Pokédex Number
- Height
- Weight
- Color
- Species
- Type(s)
- Base Att
- Base Sp. Att
- Base Spd
- Base EXP
- Base HP
- Base Def
- Base Sp. Def
- Moves
    - Description
    - Type
    - Power
    - Accuracy
    - PP
    - Damage Class
- Abilities
    - Description

## Code Example

The following code fetches Pokémon details which was used in various ways throughout the site.

```Javascript
function fetchPokemonDetails() {
    fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    ).then((response) => {
        return response.json();
    }).then((data) => {
        updatePokemonDetails(data);
    }).catch((error) => {
        return error;
    });
};

```

## Installation

```Bash

git clone git@github.com:alyssadicarlo/pokespace.git

cd pokespace

open index.html

```

## API Reference

- [PokéAPI](https://pokeapi.co/)
- [Animechan](https://animechan.vercel.app/)

## Collaborators

- [Alyssa DiCarlo](https://github.com/alyssadicarlo)
- [Otis](https://github.com/gtfotis)
- [Josh Simon](https://github.com/joshsimon-bit)


## Credits

[GBA Simulator](https://github.com/endrift/gbajs/)
© 2012 – 2013 Jeffrey Pfau
