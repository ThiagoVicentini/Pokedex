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
            <div class="pokeinfos">
                <div class="infos">    
                    <div class="namenum">
                        <span id="name">${pokemon.name}</span>
                        <span id="num">N° ${pokemon.id}</span>
                    </div>

                    <div class="definition">
                        <div><p>${pokemon.name}</p></div>
                    </div>

                    <div class="type">
                        <p>Type</p>
                        <div class="each-type">
                            <div class="style-infos"><p>${types[0]}</p></div>
                            <div class="style-infos"><p>Type 2</p></div>
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

            <div class = "circles">
                <div class="round-frame-default"></div>
                <span class="arrow"><i class= "material-icons arrow">east</i></span>
                <div class="round-frame-default"></div>
                <span class="arrow"><i class= "material-icons arrow">east</i></span>
                <div class="round-frame-default"></div>
            </div>
            
            <div class= "buttons">
                <button class= "button-style" id="button-left"><i class= "material-icons">chevron_left</i></button>
                <button class= "button-style" id="button-right"><i class= "material-icons">chevron_right</i></button>
            </div>
        `
        const div = document.querySelector('[data-js="pokedex"]')
        div.innerHTML = accumulator      
    })
    setCookie("id", -1);

}else{

    window.location.href = "index.html";
    alert("Algo inesperado aconteceu. Cookie não encontrado! Retornando a página inicial.");

}
