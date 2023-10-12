import { useCallback, useEffect, useId, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import results from './mocks/results.json'
import noresults from './mocks/noresults.json'
import {  Movies } from './components/ListOfMovie'
import { useMovies } from './assets/hooks/useMovies'
import { Error } from './components/Error'
import { Header } from './components/Header'
import debounce from 'just-debounce-it'
import { Spinner } from './components/Spinner'

function  useSearch(){

  const [search, updateSearch] = useState('');
  const [error, setErrorCheck] = useState(null);

  // Bandera con useRef
  const isFirstInput = useRef(true);

  useEffect(() => { 
// Utilizando  la bandera
if(isFirstInput.current){
  isFirstInput.current=search===''
  return
}


    // Validaciones
    if(search === ''){
      setErrorCheck("No se puede buscar una pelicula vacia")
      return
  
    }
  
    if(search.length<3){
      setErrorCheck('La busqueda debe tener al menos 3 caracteres');
      return
    }
  
    if(search.match(/^\d+$/)){
      setErrorCheck('No se pued buscar una pelicula con un numero');
      return
    }
    setErrorCheck(null)
  
  }, [search])

  return {search,updateSearch,error,setErrorCheck}


}



function App() {
  const [sort,setSort] =useState(false)
  const {search,updateSearch,error,setErrorCheck} =useSearch()
const {movies,getMovies,errorFlags,setError,loading} =useMovies({search,sort});
// Utilizamos el useRef para referenciar el input de 
const inputRef = useRef()

const [flags, setflags] = useState(null)

const handleSubmit =(event)=>{
  event.preventDefault()
  // Forma no controlada
  // const fields =Object.fromEntries(new window.FormData(event.target))
  // Forma controlada
  const newValue = true
  setflags(newValue)
  getMovies(search)
  

}

const debouncedGetMovies =useCallback(
  debounce(search=>{
    console.log('search',search);
    getMovies({search})
  },2000)
  ,[getMovies]
)



const handleChange =(event)=>{
  const newQuery = event.target.value;

  // Si comienza con un estado vacio regresate


  updateSearch(newQuery);
  debouncedGetMovies(newQuery)
}
const  handleSort =(event)=>{
  setSort(!sort);
}



 
  const name_movie=useId();

  
  return (
    <>
    <Header/>
    <header>
      <form action="" onSubmit={handleSubmit} className="form">
    
       
        <div className="input">

        <input className='search-input' name="search" type="text" id ={name_movie} placeholder='Matrix , Avengers...' onChange={handleChange} />
        
        <div className='buttons'>
        <a onClick={handleSort} className='btn'>
                <span className="material-icons" >
                    list
                </span>
        </a>
        {/* <input type="checkbox" onChange={handleSort} checked={sort} /> */}
           <button type="submit">
                <span className="material-icons" >
                    search
                </span>
            </button>
          </div>
        </div>
       

   
      
      </form>
 {/* { movies===undefined?<Error error={error}/>:null} */}


 


    </header>
    <main className='container-movie'>
      {
        loading?<Spinner/>:<Movies movies={movies} loading={loading} />
      }
     
    
    
    </main>
    <section className='container-Error'>
    {error?<Error error={error} setError={setErrorCheck}/>:null}
    {errorFlags&&!loading?<Error error={errorFlags} setError={setError}/>:null}

    </section>


    </>
  )
}

export default App
