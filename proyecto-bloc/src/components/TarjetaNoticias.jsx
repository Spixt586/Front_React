function TarjetaNoticia({ info }) {
  return (
    <div className="tarjeta-noticia">
      <span className="tarjeta-userid">Autor #{info.userId}</span>
      <h3 className="tarjeta-titulo">{info.title}</h3>
      <p className="tarjeta-body">{info.body}</p>
      <button className="tarjeta-boton">Leer más</button>
    </div>
  );
}

export default TarjetaNoticia;