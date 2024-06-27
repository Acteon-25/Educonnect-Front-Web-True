import React from 'react';



const PDFDescarga = ({ urlEnlace, titulo }) => {
  const downloadPdfFromUrl = async () => {

    try {
      // Fetch el contenido del archivo desde la URL
      const response = await fetch(urlEnlace);
      console.log
      const blob = await response.blob();

      // Crear una URL para el Blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Crear un elemento <a> para simular la descarga del archivo
      const a = document.createElement('a');
      a.href = blobUrl;

      // Asignar el nombre del archivo con la extensión .pdf
      a.download = `${titulo}.pdf`;

      // Añadir el elemento <a> al DOM
      document.body.appendChild(a);

      // Simular el clic en el enlace para iniciar la descarga
      a.click();

      // Remover el elemento <a> del DOM
      document.body.removeChild(a);

      // Liberar la URL del Blob
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };
  return (
    <div>
      <button onClick={downloadPdfFromUrl}>Descargar PDF</button>
    </div>
  );
};

export default PDFDescarga;
