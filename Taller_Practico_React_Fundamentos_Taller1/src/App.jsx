import { useState } from 'react';

function Peliculas({titulo, añoDeEstreno}){

  const[favorita, setFavorita] = useState(false)
  return(
    <div style={{border: "1px solid gray", 
                padding: "10px", 
                margin: "5px", 
                cursor: 'pointer'
                }}
                
                onClick={() => setFavorita (!favorita)}

                >
      <p>{titulo}{añoDeEstreno}{favorita && "⭐"}</p>
      <button
      onClick={() => console.log("Se seleccionó la película: " + titulo)}>Seleccionar</button>
    </div>
  );
}


function App(){

  const [peliculas, setPeliculas] = useState(['Interestellar', 'Escape(2024)', 'Avengers: End Game', 'Spaceman'])
  const [nuevaPelicula, setNuevaPelicula] = useState('')
  function agregarPeliculas(){
    if(nuevaPelicula.trim() === ""){
      return;
    }else{
      setPeliculas([...peliculas, nuevaPelicula]);

      setNuevaPelicula('')
    }
  }

  return(
    <div>
      <h1>Mis Películas Favoritas</h1>
      <p>Mis películas registradas: {peliculas.length}</p>
      <div>
        <input type="text"
      value = {nuevaPelicula}
      onChange={(e) => setNuevaPelicula(e.target.value)}
      style ={{flex: 1, padding: '8px'}} />

      <button onClick={agregarPeliculas}>Agregar</button>
      </div>
        {peliculas.map((pelicula, añoDeEstreno, indice) => (
          <Peliculas key={indice} titulo={pelicula} añoDeEstreno={" 2025"}/>
        ))}
    </div>
  );
}



export default App
