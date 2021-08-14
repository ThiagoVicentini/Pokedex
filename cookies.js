function lerCookie(chave){
    var ChaveValor = document.cookie.match('(^|;) ?' + chave + '=([^;]*)(;|$)');
    return ChaveValor ? ChaveValor[2] : null; 
}

const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
const getPokemonPhraseURL = (id) => `https://pokeapi.co/api/v2/pokemon-species/${id}`;
let id_pokemon = lerCookie("id");
let frase = ''; 

if(id_pokemon != null){
    pokemonPromise = fetch(getPokemonURL(id_pokemon)).then(response => response.json());
    pokemonPromise.then(pokemon => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        type1 = types[0];
        type2 = types[1];

        let accumulator = `
            <div class="pokeinfos">
                <div class="infos">    
                    <div class="namenum">
                        <span id="name">${pokemon.name}</span>
                        <span id="num">N° ${pokemon.id}</span>
                    </div>

                    <div class="definition">
                        <div><p>${frase}</p></div>
                    </div>

                    <div class="type">
                        <p>Type</p>
                        <div class="each-type">
                            <div class="style-infos"><p>${type1}</p></div>`
                            if(type2 != undefined)
                                accumulator += `<div class="style-infos"><p>${type2}</p></div>`;
                            accumulator += `
                        </div>
                    </div>
                </div>
                <div class="pokeimg">
                    <img src="${pokemon.sprites.front_default}" alt="pokemon" width="739" height="598"/>
                </div>
            </div>
            
            <div class="quadro">
                <div class="height">
                    Height: ${pokemon.height}
                </div>
                <div class="weight">
                    Weight: ${pokemon.weight}
                </div>
                <div class="abilities">
                    Abilities
                </div>
            </div>

            <div class="buttons">
                <button class= "button-style" id="button-left"><i class="material-icons">chevron_left</i></button>
                <button class= "button-style" id="button-right"><i class="material-icons">chevron_right</i></button>
            </div>
        `;
        const body = document.querySelector('[data-js="pokedex"]');
        body.innerHTML = accumulator;    
    });

}else{

    window.location.href = "index.html";
    alert("Algo inesperado aconteceu. Cookie não encontrado! Retornando a página inicial.");

}
