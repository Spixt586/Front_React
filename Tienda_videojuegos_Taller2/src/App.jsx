import './App.css'
import TablaVideoJuegos from './components/TablaVideoJuegos'
import { useState } from 'react'
import data from './data/videojuegos'
import FormularioVideoJuego from './components/FormularioVideoJuegos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import PaginaNoEncontrada from './components/PaginaNoEncontrada'

function App() {
  const [videoJuegos, setVideoJuegos] = useState(data)

  function agregarVideoJuego(videoJuegoNuevo) {
    setVideoJuegos([...videoJuegos, videoJuegoNuevo])
  }

  function eliminarVideoJuego(id) {
    const filtrados = videoJuegos.filter((vid) => vid.id !== id)
    setVideoJuegos(filtrados)
  }

  function editarVideoJuego(videoJuegoEditado) {
    const actualizados = videoJuegos.map((vid) => {
      if (vid.id === videoJuegoEditado.id) {
        return videoJuegoEditado
      } else {
        return vid
      }
    })
    setVideoJuegos(actualizados)
  }
  function manejarGuardar({videoJuego}) {
    const existe = videoJuegos.find((vid) => vid.id === videoJuego.id);

    if (existe) {
      editarVideoJuego(videoJuego);
    } else {
      agregarVideoJuego(videoJuego);
    }
  }
  /*
  <FormularioVideoJuego   />
  */

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideoJuegos
              videoJuegos={videoJuegos}
              onEliminar={eliminarVideoJuego}
            />

          } />
        <Route
          path="/nuevo"
          element={
            <FormularioVideoJuego
              Onguardar={manejarGuardar}
            />
          } />
        <Route
          path="/editar"
          element={
            <FormularioVideoJuego
              Onguardar={manejarGuardar}
            />
          } />
        <Route
          path="*"
          element={
            <PaginaNoEncontrada/>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App