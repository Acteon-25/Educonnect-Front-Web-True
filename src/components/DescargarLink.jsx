import React, { useState, useEffect } from 'react';
import PDFDescarga from "./PDFDescarga"

function DescargarContenido({ contenidoId }) {
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    fetch(`https://biblioteca-digital-api-production.up.railway.app/api/contenido/${contenidoId}`)
      .then(res => res.json())
      .then(data => setContenido(data))
      .catch(error => console.error('Error al obtener el contenido:', error));
    
  }, [contenidoId]);

  if (!contenido) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PDFDescarga urlEnlace={contenido.contenido} titulo={contenido.titulo}>
        
      </PDFDescarga>
    </div>
  );
}

export default DescargarContenido;