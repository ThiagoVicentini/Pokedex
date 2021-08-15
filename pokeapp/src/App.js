import React from 'react';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const App = (props) => {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path ='/' render={(props) => <Pokedex {...props} />} />
      <Route path= '/:pokemonId' render={(props)=> <Pokemon {...props} />} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;

