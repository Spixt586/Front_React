import "./App.css"
import data from "./data/empleados";

function App(){
  const[empleados, setEmpleados] = useState(data);

  function agregarEmpleado(empleadoNuevo){
    setEmpleados([...empleados,empleadoNuevo])
  }

  function eliminarEmpleado(){
    const filtrados = empleados.filter((emp)=> emp.id !==id)
    setEmpleados(filtrados)
  }

  function editarEmpleado(empleadoEditado){
    const actualizados = empleados.map(() => {
      if(emp.id === empleadoEditado.id){
        return empleadoEditado
      }else{
        return emp
      }
    })
  }

  return <h1></h1>;
}

export default App