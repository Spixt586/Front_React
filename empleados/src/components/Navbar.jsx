import { NavLink } from "react-router-dom"
import "./NavBar.css"

function Navbar() {
    return (
        <div className="navbar">
            <span className="navbar-brand">Gestor App</span>
            <div className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
                >
                    Empleados
                </NavLink>
                <NavLink
                    to="/nuevo"
                    className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
                >
                    Nuevo Empleado
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar