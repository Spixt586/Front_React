import { useState, useEffect } from 'react';
import TarjetaNoticia from './TarjetaNoticias';

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setNoticias(data.slice(0, 12)); // Limitamos a 12 noticias por UX
        setCargando(false);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="cargando">Cargando noticias...</p>;
  }

  return (
    <div className="grid-noticias">
      {noticias.map(noticia => (
        <TarjetaNoticia key={noticia.id} info={noticia} />
      ))}
    </div>
  );
}

export default ListaNoticias;