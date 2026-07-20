import './App.css'
import TablaVideoJuegos from './components/TablaVideoJuegos'
import { useState, useEffect } from 'react'
import data from './data/videojuegos'
import FormularioVideoJuego from './components/FormularioVideoJuegos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import PaginaNoEncontrada from './components/PaginaNoEncontrada'
import AlertaNotificacion from "./components/AlertaNotificacion.jsx"


function App() {

  const [mensaje, setMensaje] = useState("")
  const [videoJuegos, setVideoJuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos")
    return datosGuardados ? JSON.parse(datosGuardados) : data
  })

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videoJuegos))
  }, [videoJuegos])

  function agregarVideoJuego(videoJuegoNuevo) {
    setVideoJuegos([...videoJuegos, videoJuegoNuevo]);
    setMensaje("El juego fué agregado correctamente")
  }

  function eliminarVideoJuego(id) {
    const filtrados = videoJuegos.filter((vid) => vid.id !== id)
    setVideoJuegos(filtrados)
    setMensaje("El juego fué eliminado correctamente")
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
    setMensaje("El juego fue editado exitosamente")
  }
  function manejarGuardar({ videoJuego }) {
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
      <AlertaNotificacion
        mensaje={mensaje}
        onCerrar={() => setMensaje("")}
      />
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
            <PaginaNoEncontrada />
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App