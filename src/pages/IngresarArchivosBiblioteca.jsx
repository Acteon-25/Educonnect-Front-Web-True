import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function IngresarArchivosBiblioteca() {
  const navigate = useNavigate();

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
      console.log('Archivo enviado:', response.data);
      setMensaje('Archivo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar Archivo:', error);
      setError('Error al enviar la Archivo. Por favor, inténtalo de nuevo.');
    }
  };



  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <div className='bg-violet-500 rounded-xl py-2 px-4 text-xl text-white text-center mb-6 font-semibold'>
        <button onClick={() => navigate(-1)}>Retroceder</button>
      </div>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Ingresar Archivos a la Biblioteca</h1>
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
            {/* <select onChange={subirTipo} value={tipo}>
              <option value="libro">Libro</option>
              <option value="imagen">Imagen</option>
              <option value="video">Video</option>
            </select> */}
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caratula:
            </label>
            <input
              type="file"
              id="caratula"
              onChange={subirCaratula}
              className="hidden"
            />
            <label
              htmlFor="caratula"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-gray-700 bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300"
            >
              Seleccionar Caratula
            </label>
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contenido:
            </label>
            <input
              type="file"
              id="contenido"
              onChange={subirContenido}
              className="hidden"
            />
            <label
              htmlFor="contenido"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-gray-700 bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300"
            >
              Seleccionar Contenido
            </label>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300">
            Enviar Archivo
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngresarArchivosBiblioteca;

