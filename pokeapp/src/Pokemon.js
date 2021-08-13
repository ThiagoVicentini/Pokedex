import React, { useEffect, useState } from 'react';
import { Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from 'axios';
import './index.css';
import './App.css';

const Pokemon = (props) => {
    const { match, history } = props;
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
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <div>
                <div class="primeira-tela">
                    <div class="right">
                    <div class="name-index">
                        {`${name} ${id}`}
                    </div>
        
                    <div class="initial-text">
                    </div>
        
                    <div class='type-container'>
                    {`${types} ${types}`}
                    </div>
        
                    <div class="weaknesses-container">
                        <div></div>
                    </div>
        
                    <div class='left'>
                        <img src= {fullImageUrl}></img>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="quadro">
                    <div class="properties">
                    {`Altura: ${height}`}
                    </div>
                    <div class="properties">
                    {`Peso: ${weight}`}
                    </div>
                    <div class="properties">
                    {`Espécie: ${species}`}
                    </div>
                    <div class="properties">
                        Abilities
                    </div>
                    <div class="properties">
                        Gender
                    </div>
                
                </div>
                    <div class="evolution-container">
                        <div id="evolution1" class="evolution"></div>
                        <div id="evolution2" class="evolution"></div>
                        <div id="evolution3" class="evolution"></div>
                    </div>
        
                    <button onclick="topFunction()" class="button-top">
                        <span class= "material-icons">expand_less</span>
                    </button>
                </div>
        
            </div>
            );
    };

    return (
        <>
          {pokemon === undefined && <CircularProgress />}
          {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
          {pokemon === false && <p> Pokemon not found</p>}
    
          {pokemon !== undefined && (
            <Button class="button" onClick={() => history.push("/")}>
              Voltar
            </Button>
          )}
        </>
      );
    };

export default Pokemon;
