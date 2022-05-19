import React from "react";

interface LoadingProps {
    loading: boolean
    nextPage: any
  }
  
export const LoadMore:React.FC<LoadingProps> = (props) => {
    const { loading, nextPage } = props
    return (<div className='flex items-center justify-center'>
        <button className=' w-1/6 h-10 bg-blue-400 text-white rounded-lg text-base hover:bg-blue-700' onClick={nextPage}>{" "}{loading ? "Cargando..." : "Cargar más Pokemon "}{" "}</button>
        </div>);
}