import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioEmpleado.css";

function FormularioEmpleado({ Onguardar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const empleadoRecuperado = location.state?.empleado || null;

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [turno, setTurno] = useState("");
    const [activo, setActivo] = useState(true);
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [salario, setSalario] = useState("");

    useEffect(() => {
        if (empleadoRecuperado !== null && empleadoRecuperado !== undefined) {
            setNombre(empleadoRecuperado.nombre);
            setEdad(empleadoRecuperado.edad);
            setDepartamento(empleadoRecuperado.departamento);
            setTurno(empleadoRecuperado.turno);
            setActivo(empleadoRecuperado.activo);
            setFechaIngreso(empleadoRecuperado.fechaIngreso);
            setSalario(empleadoRecuperado.salario);
        } else {
            setNombre("");
            setEdad("");
            setDepartamento("");
            setTurno("");
            setActivo(true);
            setFechaIngreso("");
            setSalario("");
        }
    }, [empleadoRecuperado]);

    function manejarGuardar() {
        const empleado = {
            id: empleadoRecuperado !== null && empleadoRecuperado !== undefined ? empleadoRecuperado.id : Date.now(),
            nombre: nombre,
            edad: Number(edad),
            departamento: departamento,
            turno: turno,
            activo: activo,
            fechaIngreso: fechaIngreso,
            salario: Number(salario)
        };

        Onguardar({ empleado });
        navigate("/");
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <div className="formulario-page">
            <div className="formulario-card">
                <header className="formulario-header">
                    <h2>{empleadoRecuperado ? "Editar Empleado" : "Nuevo Empleado"}</h2>
                    <p>{empleadoRecuperado ? "Actualiza los datos del registro" : "Completa los datos del registro"}</p>
                </header>

                <div className="formulario-grid">
                    <div className="campo">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="edad">Edad</label>
                        <input
                            id="edad"
                            type="number"
                            min="0"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="departamento">Departamento</label>
                        <select
                            id="departamento"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}>
                            <option value="" disabled>Selecciona un departamento</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                            <option value="Finanzas">Finanzas</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Atención al Cliente">Atención al Cliente</option>
                            <option value="Logística">Logística</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                        <input
                            id="fechaIngreso"
                            type="date"
                            value={fechaIngreso}
                            onChange={(e) => setFechaIngreso(e.target.value)} />
                    </div>

                    <div className="campo campo-full">
                        <label htmlFor="salario">Salario</label>
                        <input
                            id="salario"
                            type="number"
                            min="0"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)} />
                    </div>

                    <div className="turnos-grupo">
                        <p className="turnos-titulo">Turno</p>
                        <div className="turnos-opciones">
                            <label className="turno-chip">
                                <input type="radio" name="turno" value="Mañana" checked={turno === "Mañana"}
                                    onChange={(e) => setTurno(e.target.value)} />
                                <span>Mañana</span>
                            </label>
                            <label className="turno-chip">
                                <input type="radio" name="turno" value="Tarde" checked={turno === "Tarde"}
                                    onChange={(e) => setTurno(e.target.value)} />
                                <span>Tarde</span>
                            </label>
                            <label className="turno-chip">
                                <input type="radio" name="turno" value="Noche" checked={turno === "Noche"}
                                    onChange={(e) => setTurno(e.target.value)} />
                                <span>Noche</span>
                            </label>
                        </div>
                    </div>

                    <div className="estado-campo">
                        <div className="campo-texto">
                            <span>Estado</span>
                            <span>{activo ? "Activo" : "Inactivo"}</span>
                        </div>
                        <label className="toggle">
                            <input type="checkbox" checked={activo}
                                onChange={(e) => setActivo(e.target.checked)} />
                            <span className="toggle-track"></span>
                        </label>
                    </div>

                    <div className="formulario-acciones">
                        <button className="btn-guardar" onClick={manejarGuardar}>
                            Guardar
                        </button>
                        <button className="btn-cancelar" onClick={manejarCancelar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioEmpleado;