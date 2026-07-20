import { NavLink } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    return (
        <div className="navbar">
            <span className="navbar-brand">Gestor Video Juegos</span>
            <div className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
                >
                    Video Juegos
                </NavLink>
                <NavLink
                    to="/nuevo"
                    className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
                >
                    Nuevo Video Juego
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar