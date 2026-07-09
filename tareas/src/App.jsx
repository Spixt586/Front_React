import './App.jsx'
import { useState } from 'react';

function Tareas({texto}){

  const[completada, setCompletada] = useState(false)
  return(
    <div style={{border: "1px solid gray", 
                padding: "10px", 
                margin: "5px", 
                textDecoration: completada ? 'line-through': 'none',
                opacity: completada ? 0.5 : 1,
                cursor: 'pointer'
                }}
                
                onClick={() => setCompletada(!completada)}

                >
      <p>{texto}</p>
    </div>
  );
}

function App(){

  const [tareas, setTareas] = useState(['comprar Leche', 'Hacer Ejercicio', 'Llamar al médico'])
  const [nuevaTarea, setNuevaTarea] = useState('')
  function agregarTarea(){
    if(nuevaTarea.trim() === ""){
      return;
    }else{
      setTareas([...tareas, nuevaTarea]);

      setNuevaTarea('')
    }
  }

  return(
    <div>
      <h1>Mi lista de Tareas</h1>
      <div>
        <input type="text"
        value = {nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        style={{flex: 1, padding: '8px'}}
        />

        <button onClick={agregarTarea}>Agregar</button>
      </div>
        {tareas.map((tarea, indice) => (
          <Tareas key={indice} texto={tarea}/>
        ))}
    </div>
  );
}



export default App