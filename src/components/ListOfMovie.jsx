import React from 'react'
import noresults from '../mocks/noresults.json'
import './Error.css'
import { useMovies } from '../assets/hooks/useMovies'
import { Error } from './Error'
function ListOfMovie({movies}) {
  return (
    <ul>
    {
      movies.map(movie=>(
        <li className="animate__bounce" key={movie.id}>
          


          <img src={movie.poster} className='imgposter' alt={movie.title} />
          <section className="datos">
          <h3 className='subtitulo'>{movie.title}</h3>
          <section className='detail'>
          <p className='year'>{movie.year}</p>
          <p className='type'>{movie.type}</p>
          </section>

          </section>


        </li>
      ))
    }
  </ul>
  )
}




export const Movies =({movies,loading})=>{
  
  
    const hasMovies =movies?.length>0 && loading===false
    return(      
        hasMovies
        ?<ListOfMovie movies={movies}/>
        :null 
         )
}
