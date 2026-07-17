import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideoJuegos.css";

function claseSelectPlataforma(plataforma) {
    if (plataforma === "Nintendo Switch") return "chip-nintendo";
    if (plataforma === "PlayStation 5") return "chip-playstation";
    if (plataforma === "Xbox Series X") return "chip-xbox";
    if (plataforma === "PC") return "chip-pc";
    return "";
}

function FormularioVideoJuego({ Onguardar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const videoJuegoRecuperado = location.state?.videoJuego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("");

    useEffect(() => {
        if (videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined) {
            setTitulo(videoJuegoRecuperado.titulo);
            setGenero(videoJuegoRecuperado.genero);
            setPlataforma(videoJuegoRecuperado.plataforma);
            setLanzamiento(videoJuegoRecuperado.lanzamiento);
            setPrecio(videoJuegoRecuperado.precio);
            setDisponible(videoJuegoRecuperado.disponible);
            setProgreso(videoJuegoRecuperado.progreso);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso("");
        }
    }, [videoJuegoRecuperado]);

    function manejarGuardar() {
        const videoJuego = {
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso)
        };

        Onguardar({ videoJuego });
        navigate("/");
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <div className="form-page">
            <div className="form-card">
                <header className="form-header">
                    <h2>{videoJuegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>
                    <p>{videoJuegoRecuperado ? "Actualiza los datos del catálogo" : "Agrega un título al catálogo"}</p>
                </header>

                <div className="form-grid">
                    <div className="campo campo-full">
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="genero">Género</label>
                        <input
                            id="genero"
                            type="text"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="lanzamiento">Año de Lanzamiento</label>
                        <input
                            id="lanzamiento"
                            type="number"
                            value={lanzamiento}
                            onChange={(e) => setLanzamiento(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="precio">Precio</label>
                        <input
                            id="precio"
                            type="number"
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="progreso">Progreso (0 a 1)</label>
                        <input
                            id="progreso"
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={progreso}
                            onChange={(e) => setProgreso(e.target.value)} />
                    </div>

                    <div className="campo campo-full">
                        <label htmlFor="plataforma">Plataforma</label>
                        <select
                            id="plataforma"
                            className={`select-plataforma ${claseSelectPlataforma(plataforma)}`}
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}>
                            <option value="" disabled>Selecciona una plataforma</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                            <option value="PlayStation 5">PlayStation 5</option>
                            <option value="Xbox Series X">Xbox Series X</option>
                            <option value="PC">PC</option>
                        </select>
                    </div>

                    <div className="disponible-campo">
                        <div className="campo-texto">
                            <span>Disponibilidad</span>
                            <span>{disponible ? "Disponible" : "Agotado"}</span>
                        </div>
                        <label className="toggle">
                            <input type="checkbox" checked={disponible}
                                onChange={(e) => setDisponible(e.target.checked)} />
                            <span className="toggle-track"></span>
                        </label>
                    </div>

                    <div className="form-acciones">
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
    )
}

export default FormularioVideoJuego