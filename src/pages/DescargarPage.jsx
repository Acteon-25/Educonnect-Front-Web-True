import React, { useEffect } from 'react';
import axios from 'axios';

const FileDownloader = () => {
  useEffect(() => {
    const downloadFile = async () => {
      try {
        const response = await axios.get('https://biblioteca-digital-api-production.up.railway.app/api/contenido', {
          responseType: 'arraybuffer',
        });
        console.log(response.data);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'archivo_descargado';
        link.click();

        // Libera el objeto URL después de que se haya descargado el archivo
        window.URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error al descargar el archivo', error);
      }
    };

    downloadFile();
  }, []);

  return (
    <div>
      <h1>Descargar archivo</h1>
      <p>El archivo se descargará automáticamente.</p>
    </div>
  );
};

export default FileDownloader;