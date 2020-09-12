import React, { Component } from 'react';
import axios from 'axios';
import PokemonView from './PokemonView';

export default class PokemonList extends Component {

    state = {
        url: "https://pokeapi.co/api/v2/pokemon/",
        pokemon: null
    }

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({ pokemon: res.data['results'] });
    }

    render() {
        return (
            <>
                {this.state.pokemon ? (
                    <div className="row">
                        {this.state.pokemon.map(pokemon => (
                            <PokemonView
                                key={pokemon.name}
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))}
                    </div>
                ) : (
                        <h1>Loading...</h1>
                    )}
            </>
        );
    }
}
