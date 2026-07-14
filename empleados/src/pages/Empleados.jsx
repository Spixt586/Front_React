import './Empleados.css'

function Empleados({ empleados, onEliminar, onEditar }) {
    const estadoClase = (estado) => {
        const key = (estado || "").toLowerCase();
        if (key.includes("activo") && !key.includes("inactivo")) return "estado-activo";
        if (key.includes("inactivo")) return "estado-inactivo";
        if (key.includes("vacacion")) return "estado-vacaciones";
        return "estado-default";    
    };

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
                                        <span className={`estado-pill ${estadoClase(emp.estado)}`}>
                                            {emp.estado}
                                        </span>
                                    </td>
                                    <td data-label="Acciones">
                                        <div className="acciones-group">
                                            <button
                                                className="btn btn-editar"
                                                onClick={() => onEditar(emp)}
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