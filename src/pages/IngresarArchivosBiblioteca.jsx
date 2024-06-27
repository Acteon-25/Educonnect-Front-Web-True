import { useState } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBarAsesor'

function IngresarArchivosBiblioteca() {

  const [titulo, setTitulo] = useState('');
  const [curso, setCurso] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [caratula, setCaratula] = useState(null);
  const [contenido, setContenido] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const subirTipo = (e) => {
    setTipo(e.target.value);
  }

  const subirCaratula = (e) => {
    setCaratula(e.target.files[0]);
  }

  const subirContenido = (e) => {
    setContenido(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('curso', curso);
    formData.append('autor', autor);
    formData.append('tipo', tipo);
    formData.append('caratula', caratula);
    formData.append('contenido', contenido);
    setError(null);
    try {
      const response = await axios.post('https://biblioteca-digital-api-production.up.railway.app/api/contenido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Calificación enviada:', response.data);
      setMensaje('Calificación enviada con éxito');
    } catch (error) {
      console.error('Error al enviar calificación:', error);
      setError('Error al enviar la calificación. Por favor, inténtalo de nuevo.');
    }
  };



  return (
    <div className='  '>
      <SideBar />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">Ingresar Archivos a la Biblioteca</h1>

        {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titulo:
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Curso:
            </label>
            <input
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Autor:
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo:
            </label>
            <select onChange={subirTipo} value={tipo}>
              <option value="libro">Libro</option>
              <option value="imagen">Imagen</option>
              <option value="video">Video</option>
            </select>
            {/* <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Caratula:
            </label>
            <input
              type="file"
              onChange={subirCaratula}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contenido:
            </label>
            <input
              type="file"
              onChange={subirContenido}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enviar Informe
          </button>
        </form>
      </div>
    </div>

  );
}

export default IngresarArchivosBiblioteca;

