function lerCookie(chave){
    var ChaveValor = document.cookie.match('(^|;) ?' + chave + '=([^;]*)(;|$)');
    return ChaveValor ? ChaveValor[2] : null; 
}

const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
id_pokemon = lerCookie("id")

if(id_pokemon != null){

    pokemonPromise = fetch(getPokemonURL(id_pokemon)).then(response => response.json())
    pokemonPromise.then(pokemon => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        const accumulator = `
            <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
            <h2 class="card-title">${pokemon.id} ${pokemon.name} </h2>
            <p class="card-subtitle"> ${types.join(' | ')}</p>
        `
        const div = document.querySelector('[data-js="pokedex"]')
        div.innerHTML = accumulator      
    })
    setCookie("id", -1);

}else{

    window.location.href = "index.html";
    alert("Algo inesperado aconteceu. Cookie não encontrado! Retornando a página inicial.");

}
