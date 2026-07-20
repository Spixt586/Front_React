import { useNavigate } from 'react-router-dom';
import './TablaVideoJuegos.css'

function estiloJuego(id) {
    const estilos = {
        1: 'juego-zelda',
        2: 'juego-eldenring',
        3: 'juego-cyberpunk',
        4: 'juego-hollowknight',
        5: 'juego-gta',
        6: 'juego-monsterhunter',
        7: 'juego-rdr2',
        8: 'juego-hades',
        9: 'juego-spiderman',
    };
    return estilos[id] || '';
}

function claseplataforma(plataforma) {
    if (plataforma.includes('Nintendo')) return 'plataforma-nintendo';
    if (plataforma.includes('PlayStation')) return 'plataforma-playstation';
    if (plataforma.includes('Xbox')) return 'plataforma-xbox';
    return 'plataforma-pc';
}

function TablaVideoJuegos({ videoJuegos, onEliminar }) {

    const navigate = useNavigate();

    function manejarEditar(vid) {
        navigate("/editar", { state: { videoJuego: vid } })
    }

    return (
        <div className="store-page">
            <div className="aurora-blob aurora-blob--nintendo" aria-hidden="true"></div>
            <div className="aurora-blob aurora-blob--playstation" aria-hidden="true"></div>
            <div className="aurora-blob aurora-blob--xbox" aria-hidden="true"></div>

            <div className="store-container">
                <header className="store-header">
                    <h2>VideoJuegos</h2>
                    <p>Registrados</p>
                </header>

                <table className="tabla-videojuegos">
                    <thead className="sr-only">
                        <tr>
                            <th>Título</th>
                            <th>Genero</th>
                            <th>Plataforma</th>
                            <th>Lanzamiento</th>
                            <th>Precio</th>
                            <th>Disponible</th>
                            <th>Progreso</th>
                            <th>Sinopsis</th>
                            <th>Metacritic</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoJuegos.map((vid) => (
                            <tr
                                key={vid.id}
                                className={`juego-card ${claseplataforma(vid.plataforma)}`}
                            >
                                <td className="plataforma-badge">
                                    <span className="badge">{vid.plataforma}</span>
                                </td>

                                <td className={`titulo ${estiloJuego(vid.id)}`}>
                                    {vid.titulo}
                                </td>

                                <td className="genero">{vid.genero}</td>
                                <td className="lanzamiento">{vid.lanzamiento}</td>

                                <td className={`precio ${estiloJuego(vid.id)}`}>
                                    ${vid.precio}
                                </td>

                                <td className="disponible">
                                    <span className={`stock ${vid.disponible ? 'en-stock' : 'agotado'}`}>
                                        {vid.disponible ? 'Disponible' : 'Agotado'}
                                    </span>
                                </td>

                                <td className="progreso">
                                    <progress
                                        value={vid.progreso}
                                        max={1}
                                        className="barra-progreso"
                                    ></progress>
                                    <span className="progreso-texto">
                                        {Math.round(vid.progreso * 100)}%
                                    </span>
                                </td>

                                <td className={`sinopsis ${estiloJuego(vid.id)}`}>
                                    <span>{vid.sinopsis}</span>
                                </td>

                                <td className='calificacionMetacritic'>
                                    <progress
                                        value={vid.metacritic}
                                        max="100"
                                        min="1"
                                        className='barra-metacritic'>
                                    </progress>
                                    <span className="progreso-texto">
                                        {Math.round(vid.metacritic * 1)}%
                                    </span>
                                </td>

                                <td className="acciones">
                                    <div className="acciones-group">
                                        <button className="btn btn-editar" onClick={() => manejarEditar(vid)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-eliminar" onClick={() => onEliminar(vid.id)}>
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
    )
}

export default TablaVideoJuegos