import { useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import {useEffect} from 'react'

function IngresarInformacionPage() {
  const [informe, setInforme] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [estudiante, setEstudiante] = useState();
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchUsuarios = async () => {
    const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/asesores/estudiantes',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          
        );
        console.log(response.data);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los asesores:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 

    try {
      const token = localStorage.getItem("token");
      const estudianteId = estudiante; 
      const response = await axios.post(
        `http://localhost:8080/asesores/estudiantes/${estudianteId}/informes`,
        { contenido: informe },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Calificación enviada:", response.data);
      setMensaje("Calificación enviada con éxito");
      setEstudiante('');
      setInforme("");
    } catch (error) {
      console.error("Error al enviar calificación:", error);
      setError(
        "Error al enviar la calificación. Por favor, inténtalo de nuevo."
      );
    }
  };
  const handleEstudianteChange = (event) => {
    const selectedNombre = event.target.value;
    const selectedEstudiante = usuarios.find(usuario => usuario.nombre === selectedNombre);
    console.log(selectedEstudiante.idUsuario);
    setEstudiante(selectedEstudiante.idUsuario);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Informe del Estudiante</h1>

          {mensaje && <p className="text-green-500 mb-4 text-center">{mensaje}</p>}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <datalist id="usuarios">
              {usuarios.map((usuario) => (
                <option key={usuario.idUsuario} value={usuario.nombre}/>
              ))}
            </datalist>
            <div>
              <label
                htmlFor="estudiante"
                className="block text-sm font-medium text-gray-700"
              >
                Estudiante:
              </label>
              <input
                list="usuarios"
                id="estudiante"
                value={estudiante ? estudiante.nombre : ''}
                onChange={handleEstudianteChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="comentario"
                className="block text-sm font-medium text-gray-700"
              >
                Informe:
              </label>
              <textarea
                id="informe"
                value={informe}
                onChange={(e) => setInforme(e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Enviar Informe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IngresarInformacionPage;
