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

    const [errores, setErrores] = useState({});

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [metacritic, setMetacritic] = useState("")
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("");
    const [sinopsis, setSinopsis] = useState("")


    useEffect(() => {
        if (videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined) {
            setTitulo(videoJuegoRecuperado.titulo);
            setGenero(videoJuegoRecuperado.genero);
            setPlataforma(videoJuegoRecuperado.plataforma);
            setMetacritic(videoJuegoRecuperado.metacritic)
            setLanzamiento(videoJuegoRecuperado.lanzamiento);
            setPrecio(videoJuegoRecuperado.precio);
            setDisponible(videoJuegoRecuperado.disponible);
            setProgreso(videoJuegoRecuperado.progreso);
            setSinopsis(videoJuegoRecuperado.sinopsis);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setMetacritic("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso("");
            setSinopsis("");
        }
    }, [videoJuegoRecuperado]);

    function validarFormulario() {

        const nuevosErores = {}

        if (titulo.trim() === "") {
            nuevosErores.titulo = "El nombre del videojuego no puede estar vacio ni conntener solo espacios "
        }

        if (!metacritic || metacritic < 1 || metacritic > 100) {
            nuevosErores.metacritic = "La calificación debe estar entre 1 y 100"
        }

        if (!sinopsis || sinopsis.trim().length < 10) {
            nuevosErores.sinopsis = "La sinopsis debe contener al menos 10 caracteres"
        } else if (sinopsis.trim().length > 250) {
            nuevosErores.sinopsis = "La sinopsis debe ser menor a 250 carácteres"
        }
        if(!progreso || progreso < 0 || progreso > 1){
            nuevosErores.progreso = "El progreso debe ser entre 0 y 1"
        }

        if (!lanzamiento) {
            nuevosErores.lanzamiento = "Debe seleccionar una fecha de lanzamiento válida"
        } else if (lanzamiento > new Date().toISOString().split("T")[0]) {
            nuevosErores.lanzamiento = "La fecha no puede ser tampoco una fecha futura"
        }
        if (!precio || Number(precio) <= 0) {
            nuevosErores.precio = "El precio debe ser mayor a 0"
        }
        return nuevosErores;
    }

    function manejarGuardar() {

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }
        setErrores({})

        const videoJuego = {
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            metacritic: Number(metacritic),
            lanzamiento: lanzamiento,
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso),
            sinopsis: sinopsis
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
                        {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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
                            type="date"
                            value={lanzamiento}
                            onChange={(e) => setLanzamiento(e.target.value)}
                        />
                        {errores.lanzamiento && <span className="error-mensaje">{errores.lanzamiento}</span>}
                    </div>

                    <div className="campo">
                        <label htmlFor="precio">Precio</label>
                        <input
                            id="precio"
                            type="number"
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                        {errores.precio && <span className="error-mensaje">{errores.precio}</span>}

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
                            onChange={(e) => setProgreso(e.target.value)} 
                        />
                        {errores.progreso && <span className="error-mensaje">{errores.progreso}</span>}
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
                    <div className="campo campo-full">
                        <label htmlFor="metacritic">Puntuación Metacritic</label>
                        <input
                            id="metacritic"
                            type="number"
                            min={1}
                            max={100}
                            value={metacritic}
                            onChange={(e) => setMetacritic(Number(e.target.value))}
                        />
                        {errores.metacritic && <span className="error-mensaje">{errores.metacritic}</span>}
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

                    <div className="campo campo-full">
                        <label htmlFor="sinopsis">Sinopsis</label>
                        <textarea
                            id="sinopsis"
                            value={sinopsis}
                            onChange={(e) => setSinopsis(e.target.value)}
                            minLength={10}
                            maxLength={250}
                        />
                        {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
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