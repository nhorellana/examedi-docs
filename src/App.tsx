import React, { useEffect, useState } from "react";
import { LoadMore } from "./components/loadMore";
import { PokeCard } from "./components/pokeCards";
import { RandomPokemons } from "./components/randomPokemons";
import { POKEMON_API } from "./static/constants";
import axios from "axios";
import './index.css'

interface Pokemons {
  name: string
  id: number
  url: string
  types: []
}

const App:React.FC = () => {
  const IMG = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
  const [pokemons, setPokemons] = useState<Pokemons[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        `${POKEMON_API}?limit=12&offset=0`
      )
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const indvPokemon = await axios.get(`${POKEMON_API}${pokemon.name}`)
        setPokemons((p) => [...p, indvPokemon.data])
        setLoading(false)
      })
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `${POKEMON_API}${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  const getCount = async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/?limit=0`
    );
    setLoading(true);
    setPokemons([])
    const count:number = res.data.count
    const pokemonRandomValues:number[] = Array.from({length: 12}, () => Math.floor(Math.random() * count));
    console.log(`Lista de numeros: ${pokemonRandomValues}`)
    pokemonRandomValues.forEach(async (pokemon: number) => {
      const poke = await axios.get(
        `${POKEMON_API}${pokemon}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="bg-pack-train">
      <div className=" bg-white container my-12 mx-auto px-4 md:px-12 space-y-10">
        <RandomPokemons   getCount={getCount} loading={loading}  />
        <div className="flex flex-wrap -mx-1 lg:-mx-4">  
          {pokemons.map((pokemon) => {
            return (
                <PokeCard 
                name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                id={('0000'+ pokemon.id ).slice(-3)}
                img={IMG + ('0000'+ pokemon.id ).slice(-3)+ '.png'}
                types={pokemon.types}
                />
              )
            })}
        </div>
        <LoadMore nextPage={nextPage} loading={loading}  />
      </div>
    </div>
  )
}

export default App