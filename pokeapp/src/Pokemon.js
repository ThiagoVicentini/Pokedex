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
    const fullImageUrl = `http://pokeapi.co/media/sprites/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className='maiorDeTodos'>
        <div className= "primeira-tela">
              <div className= "info-container">    
                  <div className= "namenum">
                      <span id = "name">{toFirstCharUppercase(name)}</span>
                      <span id = "num">{` Nº ${id}`}</span>
                  </div>

                  <div className= "definition">
                        <div><p>There's a seed.</p></div>
                        {`Species: ${species.name}`}
                  </div>

                  <div className= "type">
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

              <div className = "pokeimg"><img src={front_default} alt="pokemon"></img></div>
              </div>
            
            <div className='segunda-tela'>
            <div className ="quadro">
                <div className ="caracteristica">
                    {`Height: ${height} ft`}
                </div>
                <div className ="caracteristica">
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
            
            {/* <div className='evolution-container'>
              <div className='evolution'><img src={`http://pokeapi.co/media/sprites/pokemon/${id}.png`}></img></div>
              <div className='evolution' src={`http://pokeapi.co/media/sprites/pokemon/${id+1}.png`}></div>
              <div className='evolution'></div>
            </div>
            */}

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