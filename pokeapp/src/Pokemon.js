import React, { useEffect, useState } from "react";
import './index.css';
import { CircularProgress } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { Link } from 'react-router-dom';
import './App.css';

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
    const { name, id, species, height, weight, types, sprites, abilities, stats} = pokemon;
    console.log(pokemon);
    const { front_default } = sprites;
    return (
      <div>
        <div className= "first-screen">
              <div className= "info-container">    
                  <div className= "name-container">
                      <span id = "name">{toFirstCharUppercase(name)}</span>
                      <span id = "num">{` Nº ${id}`}</span>
                  </div>

                  <div className= "species">
                        {`Species: ${species.name}`}
                  </div>

                  <div className= "type-container">
                        <p>Type</p>
                        <div className = "each-type">
                              {types.map((typeInfo, idx) => {
                              const { type } = typeInfo;
                              const { name } = type;
                              return <div id= "type" key={idx}> <p>{name}</p> </div>
                              })}
                        </div>
                  </div>
              </div>

              <div className = "pokemon-img"><img src={front_default} alt="pokemon"></img></div>
              </div>
            
        <div className='second-screen'>
          <div className ="board">
            <div className ="height">
                    {`Height: ${height} ft`}
            </div>

            <div className ="weight">
                    {`Weight: ${weight} lbs`}
            </div>
                
            <div className ="abilities">
                <p id="abilities-title">Abilities:</p>
                {abilities.map((abilityInfo, idx) => {
                  const { ability } = abilityInfo;
                  const { name } = ability;
                  return <div id= "abilities-container" key={idx}><p id='ability'>{name}</p></div>
                  })}
                  
            </div>
          </div>
              
            <div className='board'>
              <div className='stats'>
                {stats.map((statsInfo, idx) => {
                  const { stat } = statsInfo;
                  const { base_stat } = statsInfo;
                  const { name } = stat;
                  return (
                    <>
                    <div id= "stat" key={idx}><p>{name}: {base_stat}</p></div>
                    </>
                    );
                    })}
                </div>
            </div>
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
        <div className='button' id='voltar'>
        <Link to="/">Voltar</Link>
        </div>
      )}
    </>
  );
};

export default Pokemon;