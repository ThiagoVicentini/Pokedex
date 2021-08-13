function criaCookie(value) {
    var expira = new Date();
    expira.setTime(expira.getTime() + 87600000); //expira dentro de 24h
    document.cookie = 'id=' + value + ';expires=' + expira.toUTCString(); 
}


const pokemonPromises = []

const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = async () => {   
        for(let i=1; i<=200; i++){
            const  res = await fetch(getPokemonURL(i));
            pokemon = await res.json();
            pokemonPromises.push(pokemon);
        }
        loadPokemons(pokemonPromises);
};

const loadPokemons = (pokemonPromises) => {
    Promise.all(pokemonPromises)
    .then(pokemons => {
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    
            accumulator += `
            <li class="card ${types[0]}">
                <a href="generica.html" onclick="criaCookie(${pokemon.id})"> 
                    <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
                    <h2 class="card-title">${pokemon.id} - ${pokemon.name} </h2>
                </a>
                <p class="card-subtitle"> ${types.join(' | ')}</p>
            </li>
            `;
            return accumulator;
        }, '');
        const ul = document.querySelector('[data-js="pokedex"]');
        ul.innerHTML = lisPokemons;     
    });
}

window.onload = () => {
    let searchBar = document.getElementById('searchBar');
    console.log(searchBar);
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value;

        const filteredPokemons = pokemonPromises.filter(pokemon => {
            return pokemon.name.includes(searchString); 
        });
        
        loadPokemons(filteredPokemons) 
    });
};

fetchPokemon();