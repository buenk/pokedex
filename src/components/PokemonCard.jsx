import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimateGroup } from 'react-smooth'
import './PokemonCard.css'

function PokemonCard({ pokemonId = '1'}) {

    const [pokeDetails, setPokeDetails] = useState();
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();


    function getPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            console.log('PokeDetails: \n')
            console.log(data)
            setPokeDetails(data)

        })
        .catch(error => console.log(error))
    }
    
    useEffect(() => {
        getPokemon()
    }, [])

    const data = {pokemonName: pokeDetails && pokeDetails.species.name}

    return (
        <div onClick={() => navigate('../details' , {state: data})} className='fadein'>
            <div className='pokemon-card' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {
                    hover && 
                    <h1 className='fadein-fast'>
                        {pokeDetails && pokeDetails.species.name.charAt(0).toUpperCase() + pokeDetails.species.name.slice(1)}
                    </h1>
                }
                {
                    !hover && 
                    <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${pokeDetails && pokeDetails.species.name}.png`}
                        alt={pokemonId}
                        className='fadein-fast'
                    />
                }
            </div>
        </div> 
    )
}

export default PokemonCard;