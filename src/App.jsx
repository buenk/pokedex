import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import PokemonList from './pages/PokemonList'
import AbilitiesList from './pages/AbilitiesList'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/pokedex' element={<Home />} />
          <Route path='/pokedex/home' element={<Home />} />
          <Route path='/pokedex/details' element={<Details intPokemon='raichu'/>} />
          <Route path='/pokedex/all-pokemon' element={<PokemonList />} />
          <Route path='/pokedex/all-abilities' element={<AbilitiesList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
