import './App.css'
import TablaVideoJuegos from './components/TablaVideoJuegos'
import {useState} from 'react'
import data from './data/videojuegos'

function App(){
  const [videoJuegos, setVideoJuegos] = useState(data)

  function agregarVideoJuego(videoJuegoNuevo){
    setVideoJuegos([...videoJuegos, videoJuegoNuevo])
  }

  function eliminarVideoJuego(id){
    const filtrados = videoJuegos.filter((vid)=> vid.id !== id)
    setVideoJuegos(filtrados)
  }

  function editarVideoJuego(videoJuegoEditado){
    const actualizados = videoJuegos.map((vid) => {
      if(vid.id === videoJuegoEditado.id){
        return videoJuegoEditado
      }else{
        return vid
      }
    })
    setVideoJuegos(actualizados)
  }
  return (
  <TablaVideoJuegos
    videoJuegos={videoJuegos}
    onEliminar={eliminarVideoJuego}
    onEditar={editarVideoJuego}
  />
)
}

export default App