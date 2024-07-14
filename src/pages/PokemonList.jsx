import { useEffect, useState } from "react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import './PokemonList.css'

function PokemonList() {


    const gens = [151, 100, 135, 107, 156, 72, 88, 96, 120];
    const [currentGen, setCurrentGen] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    
    

    useEffect(() => {


        let beginNum = 0;
        for (let i = 0; i < currentGen; i++) {
            beginNum += gens[i];
        }

        console.log('Beginnum: ' + beginNum)

        const list = [];
        for (let i = beginNum; i < beginNum + gens[currentGen]; i ++) {
            list.push(<PokemonCard key={i} pokemonId={i+1}/>)
        }
        setPokemonList(list)
    }, [currentGen])


    return (
        <>
            <Header currentPage='all-pokemon'/>
            <div className="gen-selector">
                <button className="change-gen left" onClick={() => {currentGen > 0 && setCurrentGen((prevState) => prevState-1)}}>&lt;</button>
                <h1 className=" gen">Generation {currentGen+1}</h1>
                <button className="change-gen right" onClick={() => {currentGen < 8 && setCurrentGen((prevState) => prevState+1)}}>&gt;</button> 
            </div>
            <div className="list-container fadein">
                {pokemonList}
            </div>
        </>
    )
}

export default PokemonList;