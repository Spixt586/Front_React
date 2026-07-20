import { useEffect } from "react";
import "./AlertaNotificacion.css"

function AlertaNotificacion({ mensaje, onCerrar }) {
    useEffect(() => {
        const temporizador = setTimeout(() => {
            onCerrar();
        }, 3000);

        return () => clearTimeout(temporizador);
    }, [onCerrar]);

    if (!mensaje) return null;

    return (
        <div className="toast-exito" role="status">
            <span className="toast-icono">✓</span>
            <span className="toast-texto">{mensaje}</span>
        </div>
    )
}

export default AlertaNotificacion;