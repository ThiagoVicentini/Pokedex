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
            <div class = "card-elements">
                <li class="card ${types[0]}">
                <a href="generica.html" onclick="criaCookie(${pokemon.id})"> 
                    <h2 class= "card-number">N° ${pokemon.id}</h2>
                    <img class="card-image ${types[0]}" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
                    <h2 class="card-title">${pokemon.name}</h2>
                </a>
                </li>
                <p class="type ${types[0]}">
                    ${types[0]}
                </p>
                <p class="type ${types[0]}">
                    ${types[0]}
                </p>
            </div>
            `;
            return accumulator;
        }, '');
        const ul = document.querySelector('[data-js="pokedex"]');
        ul.innerHTML = lisPokemons;     
    });
}

fetchPokemon()

window.onload = () => {
    let searchBar = document.getElementById('searchBar');
    console.log(searchBar);
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value;

        const filteredPokemons = pokemonPromises.filter(pokemon => {
            return pokemon.name.includes(searchString) || escape(pokemon.id).includes(searchString); 
        });
        
        loadPokemons(filteredPokemons) 
    });
};

window.onscroll = () =>{
    mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        mybutton.style.display = "block";
    } 
    else{
        mybutton.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
