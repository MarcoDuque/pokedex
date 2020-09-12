import React, { Component } from 'react';
import { Link, link } from 'react-router-dom';
import styled from 'styled-components';
import spinner from '../../25.gif';

const Sprite = styled.img`
    whidth: 5em;
    height: 5em;
    display: none`;

export default class PokemonView extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imgLoading: true,
        RequestDead: false
    };

    componentDidMount() {
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name,
            imageUrl,
            pokemonIndex
        })
    }

    render() {
        return (
            <div className='col-md-4 col-sm-6 mb-4'>
                <Link to={`pokemon/${this.state.pokemonIndex}`} >
                    <div className="card">
                        <h5 className="card-header"> {this.state.pokemonIndex} </h5>
                        {this.state.imgLoading ? (
                            <img
                                src={spinner} style={{ width: '5em', height: '5em' }}
                                className="card-img-top rounded mx-auto mt-2"
                                property="img"
                            />
                        ) : null}
                        <Sprite
                            className="card-img-top rounded mx-auto mt-2"
                            src={this.state.imageUrl}
                            style={
                                this.state.RequestDead ? { display: "none" } :
                                    this.state.imgLoading ? null : { display: "block" }
                            }
                            onLoad={() => { this.setState({ imgLoading: false }) }}
                            onError={() => { this.setState({ RequestDead: true }) }}
                        />
                        {this.state.RequestDead ? (
                            <h6 className="mx-auto">
                                <span className="badge badge-danger mt-2">Bad Request</span>
                            </h6>) : null}
                        <div className="card-body mx-auto">
                            <h6 className="card-title">
                                {this.state.name
                                    .toLowerCase()
                                    .split(' ').
                                    map(
                                        letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                    .join("")}
                            </h6>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
