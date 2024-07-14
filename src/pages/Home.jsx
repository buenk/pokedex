import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <Header currentPage='home'/>

            <div className="home-container fadein-fast">
                <div className="pokemon" onClick={() => navigate('pokedex/all-pokemon')}><p>Pokémon</p></div>

                <div className="abilities"><p>Abilities (disabled)</p></div>

                <div className="regions"><p>Regions (disabled)</p></div>
            </div>
        </div>
    )
}

export default Home;