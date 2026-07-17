import './Empleados.css'
import data from '../data/empleados'
import { useState } from 'react'
import { useAsyncValue, useNavigate } from 'react-router-dom'

function Empleados({ empleados, onEliminar, onEditar }) {

    const navigate = useNavigate();

    function manejarEditar(emp){
        
        navigate('/editar', {state: {empleado: emp}});
    }

    const textoEstado = (activo) => (activo ? "Activo" : "Inactivo")

    const estadoClase = (activo) => {
        return activo ? "estado-activo" : "estado-inactivo"
    }

    return (
        <div className="empleados-page">
            <div className="aurora-blob aurora-blob--one" aria-hidden="true"></div>
            <div className="aurora-blob aurora-blob--two" aria-hidden="true"></div>

            <div className="empleados-container">
                <header className="empleados-header">
                    <h2>Empleados</h2>
                    <p>Registros</p>
                </header>

                <div className="tabla-wrapper">
                    <table className="tabla-empleados">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Departamento</th>
                                <th>Turno</th>
                                <th>Ingreso</th>
                                <th>Salario</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((emp) => (
                                <tr key={emp.id}>
                                    <td data-label="Nombre"><span className="valor">{emp.nombre}</span></td>
                                    <td data-label="Edad" className="col-mono"><span className="valor">{emp.edad}</span></td>
                                    <td data-label="Departamento"><span className="valor">{emp.departamento}</span></td>
                                    <td data-label="Turno"><span className="valor">{emp.turno}</span></td>
                                    <td data-label="Ingreso" className="col-mono"><span className="valor">{emp.fechaIngreso}</span></td>
                                    <td data-label="Salario" className="col-mono col-salario"><span className="valor">{emp.salario}</span></td>
                                    <td data-label="Estado">
                                        <span className={`estado-pill ${estadoClase(emp.activo)}`}>
                                            {textoEstado(emp.activo)}
                                        </span>
                                    </td>
                                    <td data-label="Acciones">
                                        <div className="acciones-group">
                                            <button
                                                className="btn btn-editar"
                                                onClick={() => manejarEditar(emp)}

                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-eliminar"
                                                onClick={() => onEliminar(emp.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Empleados;