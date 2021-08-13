import React, { useState, useEffect } from 'react';
import './index.css';
import'./App.css';
import logo from './logo.svg';
import axios from 'axios';
import { Grid } from '@material-ui/core';

const Pokedex = (props) => {
    //const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
        .then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
            newPokemonData[index + 1] = {
                id: index + 1,
                name: pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
                }.png`,
            };
            });
            setPokemonData(newPokemonData);
        });
    }, []);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
      };

    const toFirstCharUppercase = (name) => {
         return name.charAt(0).toUpperCase() + name.slice(1)
      };

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
    return (
        <div className="container">
            <div className='card' onClick={() => history.push(`/${id}`)}>
                <div className="button-id">{`${id}`}</div>
                <img src={sprite}></img>
                <div className='name'>{`${toFirstCharUppercase(name)}`}</div>
            </div>
        </div>


    //   <Grid item xs={4} key={pokemonId}>
    //     <Card className='card' onClick={() => history.push(`/${id}`)}>
    //       <CardMedia
    //         //className={classes.cardMedia}
    //         image={sprite}
    //         style={{ width: "130px", height: "130px" }}
    //       />
    //       <CardContent >
    //         <h2>{`${id} ${toFirstCharUppercase(name)}`}</h2>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    )};

    return (
        <div className="App">

        <header>
            <img src={logo} className="App-logo" alt="logo" />
            <form > 
            <label>
                <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Pesquise por nome"
                />
            </label>
            </form>

            <div id="button-container">
    
            <a href="https://youtu.be/dQw4w9WgXcQ">
            <button id="surpreenda-me" className="button">Surpreenda-me!</button>
            </a>
            </div>
        </header>

        <body className='card-grid'>
            <Grid container spacing={2}>
            {Object.keys(pokemonData).map(
                (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
            </Grid>
        </body>

        </div>
        );
};

export default Pokedex;