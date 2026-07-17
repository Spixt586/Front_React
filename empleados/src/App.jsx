import { useState } from "react"
import "./App.css"
import data from "./data/empleados";
import FormularioEmpleado from "./pages/FormularioEmpleado";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Empleados from "./pages/Empleados";
import Noencontrada from "./pages/NoEncontrada";

function App() {
  const [empleados, setEmpleados] = useState(data);

  function agregarEmpleado(empleadoNuevo) {
    setEmpleados([...empleados, empleadoNuevo])
  }

  function eliminarEmpleado(id) {
    const filtrados = empleados.filter((emp) => emp.id !== id)
    setEmpleados(filtrados)
  }

  function editarEmpleado(empleadoEditado) {
    const actualizados = empleados.map((emp) => {
      if (emp.id === empleadoEditado.id) {
        return empleadoEditado
      } else {
        return emp
      }
    })
    setEmpleados(actualizados)
  }

  function manejarGuardar({ empleado }) {

    const existe = empleados.find((emp) => emp.id === empleado.id);

    if (existe) {
      editarEmpleado(empleado);
    } else {
      agregarEmpleado(empleado);
    }


  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Empleados
              empleados={empleados}
              onEliminar={eliminarEmpleado}
            />
          }
        /><Route
          path="/nuevo"
          element={
            <FormularioEmpleado
              Onguardar={manejarGuardar}
            />
          }
        />
        <Route
          path="/editar"
          element={
            <FormularioEmpleado
              Onguardar={manejarGuardar}
            />
          }
        />
        <Route
        path="*"
        element = {<Noencontrada/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App