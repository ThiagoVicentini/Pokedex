import React, { useEffect, useState } from "react";
import './index.css';
import { CircularProgress } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { Link } from 'react-router-dom';

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites, abilities, category, gender} = pokemon;
    const fullImageUrl = `http://pokeapi.co/media/sprites/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div>
        <div class= "pokeinfos">
              <div class= "infos">    
                  <div class= "namenum">
                      <span id = "name">{toFirstCharUppercase(name)}</span>
                      <span id = "num">{`Nº ${id}`}</span>
                  </div>

                  <div class= "definition">
                        <div><p>There's a seed.</p></div>
                        {`Species: ${species.name}`}
                  </div>

                  <div class= "type">
                        <p>Type</p>
                        <div class = "each-type">
                              {types.map((typeInfo) => {
                              const { type } = typeInfo;
                              const { name } = type;
                              return <div id= "type1"><p>{name}</p></div>
                              })}
                        </div>
                  </div>

                  <div class= "weaknesses">
                        <p>Weaknesses</p>
                    
                  </div>
              </div>

              <div class = "pokeimg"><img src={front_default} alt="pokemon" height='600' width='740'></img></div>
              </div>
            
            <div class="quadro">
                <div class="height">
                    {`Altura: ${height}`}
                </div>
                <div class="weight">
                  {`Peso: ${weight}`}
                </div>
                <div class="category">
                  {`Categoria: ${category}`}
                </div>
                <div class="abilities">
                {abilities.map((abilityInfo) => {
                              const { ability } = abilityInfo;
                              const { name } = ability;
                              return <div id="abilities"><p>{name}</p></div>
                              })}
                </div>
                <div class="gender">
                  Gender
                </div>
            </div>
            
            <div className='evolution-container'>
              <div className='evolution'></div>
              <div className='evolution'></div>
              <div className='evolution'></div>
            </div>
           

      </div>
    )
};

return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <p> Pokemon not found</p>}

      {pokemon !== undefined && (
        <Link to="/">Voltar</Link>
      )}
    </>
  );
};

export default Pokemon;