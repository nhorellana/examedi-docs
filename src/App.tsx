import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from './logo.svg';
import './index.css'

interface Pokemons {
  name: string
  id: number
  url: string
  types: []
}

interface Props {
  name: string
  id: string
  img: string
  types: []
}

interface InformationType {
  type: {
    name: string
  }
}


const typeColors:any = {
	"normal": '#929ba3',
	"fire": '#ff983f',
	"water": '#3393dd',
	"electric": '#fbd200',
	"grass": '#35c04a',
	"ice": '#4bd2c1',
	"fighting": '#e12c6a',
	"poison": '#b667cf',
	"ground": '#e97333',
	"flying": '#8aace4',
	"psychic": '#ff6676',
	"bug": '#84c400',
	"rock": '#c9b787',
	"ghost": '#4b6ab3',
	"dragon": '#0070ca',
	"dark": '#5b5366',
	"steel": '#598fa3',
	"fairy": '#fb8aec'
};

const typesSpanish:any = {
    "ghost": "Fantasma",
    "dark": "Siniestro",
    "electric": "Eléctrico",
    "normal": "Normal",
    "fire": "Fuego",
    "psychic": "Psíquico",
    "flying": "Volador",
    "steel": "Acero",
    "poison": "Veneno",
    "dragon": "Dragón",
    "water": "Agua",
    "ice": "Hielo",
    "rock": "Roca",
    "fighting": "Lucha",
    "grass": "Planta",
    "bug": "Bicho",
    "ground": "Tierra",
    "fairy": "Hada",
};

const Card: React.FC<Props> = (props) => {
  const { name, img, id, types } = props
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4">
            <article className="overflow-hidden ">
                <a href="#">
                    <img alt="Placeholder" className=" hover:bounceNew ease-in bg-gray-100 block h-auto w-full" src={img} />
                </a>
                <p className="ml-2 text-sm text-gray-300">
                    {'Nº.' + id}
                </p>
                <header className="place-items-start flex justify-between">
                    <h1 className="text-lg">
                        <p className="ml-2 no-underline text-black">
                            {name}
                        </p>
                    </h1>
                </header>

                <footer className="place-items-start flex justify-between leading-none">
                    <div className="place-items-start flex no-underline text-black">
                    {types.map((type:InformationType) => {
                      return (
                        <span className="text-xs inline-block py-1 px-2 rounded-lg bg-white last:mr-0 mr-1" style={{color: `${typeColors[type.type.name]}`}}>
                          {typesSpanish[type.type.name]}
                        </span>
                        )
                    })}
                    </div>
                </footer>
            </article>
    </div>
  )
}



const App:React.FC = () => {
  const [pokeCount, setCount] = useState<number>(0)
  const IMG2 = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
  const IMG_API = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
  const [pokemons, setPokemons] = useState<Pokemons[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
      )
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const indvPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p) => [...p, indvPokemon.data])
        setLoading(false)
        console.log(`Hola, plis muestrame el tipo 1: ${(indvPokemon.data.types)}`)
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
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
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
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="bg-pack-train">
      <div className=" bg-white container my-12 mx-auto px-4 md:px-12 space-y-10">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">  
          {pokemons.map((pokemon) => {
            return (
                <Card 
                name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                id={('0000'+ pokemon.id ).slice(-3)}
                img={IMG2 + ('0000'+ pokemon.id ).slice(-3)+ '.png'}
                types={pokemon.types}
                />
              )
          })}
        </div>
        <div className='flex items-center justify-center'>
          <button className=' w-1/6 h-10 bg-blue-400 text-white rounded-lg text-base hover:bg-blue-700' onClick={nextPage}>{" "}{loading ? "Cargando..." : "Cargar más Pokemon "}{" "}</button>
        </div>
      </div>
    </div>
  )
}

export default App