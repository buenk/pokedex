import { useEffect, useState } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header({currentPage}) {

    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState()
    const [allPokemon, setAllPokemon] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch('src/pokemonNames.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setAllPokemon(data)
        })
        .catch(error => console.log(error))
    }, [])

    function handleChange(e) {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        const filteredPokemon = allPokemon.filter(pokemon => pokemon.toLowerCase().includes(searchValue.toLowerCase()));
        const slicedSuggestions = filteredPokemon.slice(0, 3);

        setSuggestions(slicedSuggestions)
        console.log(suggestions)
    }, [allPokemon, searchValue])

    function handleSearch(suggestion) {
        if (currentPage == 'details') {
            navigate('/pokedex/details', {state: {pokemonName: suggestion}})
            window.location.reload();
        } else {
            navigate('/pokedex/details', {state: {pokemonName: suggestion}})
        }
    }

    return (
        <div>
            <div className="header">
                <div className='header--left'>
                    <a href='/pokedex/home' className={(currentPage == 'home') ? 'link currentPage' : 'link'}>Home</a>
                    <a href='/pokedex/all-pokemon' className={(currentPage == 'all-pokemon') ? 'link currentPage' : 'link'}>Pokémon</a>
                    <p className={(currentPage == 'all-abilities') ? 'currentPage disabled' : 'disabled'}>Abilities</p>
                    <p className={(currentPage == 'all-regions') ? 'currentPage disabled' : 'disabled'}>Regions</p>
                </div>

                <div className="search-container">
                    <input type="text" placeholder='Search Pokémon' value={searchValue} onChange={handleChange}/>
                    {searchValue && <div className="suggestions">
                        <div className="suggestion" onClick={() => handleSearch(suggestions[0])}>{suggestions[0]}</div>
                        <div className="suggestion" onClick={() => handleSearch(suggestions[1])}>{suggestions[1]}</div>
                        <div className="suggestion" onClick={() => handleSearch(suggestions[2])}>{suggestions[2]}</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

//The above code uses the useNavigate hook to pass a state to the details page, which in turn renders the correct pokemon.

export default Header;