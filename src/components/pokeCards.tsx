import React from "react";
import { TYPES_SPANISH, TYPES_COLORS } from "../static/constants"

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

export const PokeCard: React.FC<Props> = (props) => {
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
                          <span className="text-xs inline-block py-1 px-2 rounded-lg bg-white last:mr-0 mr-1" style={{color: `${TYPES_COLORS[type.type.name]}`}}>
                            {TYPES_SPANISH[type.type.name]}
                          </span>
                          )
                      })}
                      </div>
                  </footer>
              </article>
      </div>
    )
  }