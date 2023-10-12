import React from 'react'

export const Error = ({error,setError}) => {
  const handleError =()=>{
    setError(null)
  }
  return (

    
      error?<div className="card">
      <div className="header">
        <div className="image"><svg aria-hidden="true" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinejoin="round" strokeinecap="round"></path>
                  </svg></div>
        <div className="content">
           <span className="title">{error}</span>
           <p className="message">El titulo de la pelicula   no esta disponible</p>
        </div>
         <div className="actions">
           <button className="desactivate" onClick={handleError} type="button">Intenta de Nuevo</button>
        </div>
      </div>
      </div>:null
    
    
    
  )
}
