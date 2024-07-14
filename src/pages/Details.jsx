import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Details.css'

function Details({intPokemon = 'Raichu'}) {

    const location = useLocation();
    const data = location.state;

    const [typedName, setTypedName] = useState('')
    const [pokeName, setPokeName] = useState(data ? data.pokemonName : intPokemon)

    const [pokeDetails, setPokeDetails] = useState()
    const [pokeSpeciesDetails, setPokeSpeciesDetails] = useState()

    function updateDetails() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
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

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            console.log('PokeSpeciesDetails: \n')
            console.log(data)
            setPokeSpeciesDetails(data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        updateDetails()
    }, [pokeName])


    function submitPokeName(e) {
        e.preventDefault()
        setPokeName(typedName)
    }

    let types;
    pokeDetails && (types = pokeDetails.types.map((type) => type.type.name).join(', '))
    console.log(types)

    let abilities;
    pokeDetails && (abilities = pokeDetails.abilities.map((ability) => <p><a href={"./abilities/" + ability.ability.name}>{ability.ability.name}</a></p>))
    console.log(abilities)

    return (
        <>
            <Header currentPage='details' />
            <div className="container fadein-fast">
                <div className="main">
                    <h1 className="title fadein-fast">{pokeName.charAt(0).toUpperCase() + pokeName.slice(1).toLowerCase()}</h1>
                    <p className="description fadein-fast">{pokeSpeciesDetails && pokeSpeciesDetails.flavor_text_entries[0].flavor_text.replace(/\u000c/g,' ')}</p>
                    
                    <div className="data-container">
                        <div className="image-container">
                            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokeName.toLowerCase()}.png`}/>
                        </div>
                        <div className="data">
                            <h2>Basic data</h2>
                            <div className="data--cols">
                                <div className="col col-1">
                                    <p>No.</p>
                                    <p>Type(s)</p>
                                    <p>Height</p>
                                    <p>Weight</p>
                                    <p>Abilities</p>

                                </div>
                                <div className="col col-2">
                                    <p>{pokeDetails && pokeDetails.id}</p>
                                    <p>{pokeDetails && types}</p>
                                    <p>{pokeDetails && pokeDetails.height*10 + ' cm'}</p>
                                    <p>{pokeDetails && pokeDetails.weight/10 + ' kg'}</p>
                                    {abilities}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;