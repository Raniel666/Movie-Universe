import { useState } from "react";

const API_KEY ='a452f05e'
export const searchMovies =async ({search})=>{
    if(search ==''){
        return null
    }

    try{
        const response = await  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const json = await response.json()
        const movies = await json.Search

        console.log(movies)
        // Mapeamos  las constantes de la API importantes realizarla buenas practica
        return movies?.map(movie=>({
            id:movie.imdbID,
            title:movie.Title,
            year:movie.Year,
            poster:movie.Poster,
            type:movie.Type
           
        }
        
        ));
    }catch(error){
        throw new Error(error);
    }


   
}