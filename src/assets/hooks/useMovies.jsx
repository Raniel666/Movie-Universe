

import results from  '../../mocks/results.json'

import withresults from '../../mocks/results.json';
import withnoresults from '../../mocks/noresults.json';
import { useCallback, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';
import { useMemo } from 'react';

export function useMovies({search,sort}){
  const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [errorFlags,setError] = useState(null);
  // Vamos a utilizar el useRef  para guardar la buscqueda antetio
  const  previusSearch = useRef(search);

 

    const getMovies = useCallback(async (search)=>{
      // Si la busqueda es igual que la anterior retorna
      if(search === previusSearch.current){
        return
      }
      console.log(search)
      try{
        setloading(true);
        setError(null)
        previusSearch.current =search
        const newMovies =await searchMovies(search)
        setmovies(newMovies)
        setTimeout(() => {
          if(newMovies===undefined){
            setError("Error la pelicula no se ecuentra disponible")
          }
        }, 1000);

      }catch(erro){
       
          setloading(false);
          setError(erro.message)
          throw Error("Entrada de pelicula invalida vuelve a intentar")
       

      }finally{
        // El finally se  ejecuta tanto  en catch
        setloading(false)
      }
    },[])

    // Si esta activo el ordenamiento  enviamos las peliculas ordenas por titulo
    // UseMemo permite memorizar  calculos cuando cambian las dependend
    const sortedMovies = useMemo(()=>{
      if(movies==undefined){
        return
      }
      return sort?[...movies].sort
      ((a,b)=>a.title.localeCompare(b.title))
      :movies
    },[sort,movies])


    return {movies:sortedMovies,getMovies,errorFlags,loading,setError}
}
