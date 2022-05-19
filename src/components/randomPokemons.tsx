import React from "react";

interface RandomPokemonProps {
    loading: boolean
    getCount: any
}

export const RandomPokemons: React.FC<RandomPokemonProps> = (props) => {
    const { loading, getCount} = props
    return (<div className='pt-4 justify-center'>
        <button className='pl-24 center flex w-1/3 h-10 bg-blue-400 text-white rounded-lg text-base hover:bg-blue-700' onClick={getCount}>
        <RefreshLogo />
        <span className="pl-2 self-center">
          {" "}{loading ? "Cargando..." : "¡Sorpréndeme! "}{" "}
        </span>
        </button>
      </div>);
    }

export const RefreshLogo:React.FC<any> = () => {
    return (<svg className="self-center animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>);
}