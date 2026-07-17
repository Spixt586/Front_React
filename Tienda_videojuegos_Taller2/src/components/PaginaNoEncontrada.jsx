import { Link } from "react-router-dom"
import "./PaginaNoEncontrada.css"

function PaginaNoEncontrada() {
    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <p className="notfound-codigo">Error 404</p>
                <h1 className="notfound-titulo">Página no Encontrada</h1>
                <p className="notfound-texto">
                    Este título no existe en el catálogo. Revisa la dirección o vuelve al inicio.
                </p>
                <Link to="/" className="notfound-boton">
                    Volver al catálogo
                </Link>
            </div>
        </div>
    )
}

export default PaginaNoEncontrada