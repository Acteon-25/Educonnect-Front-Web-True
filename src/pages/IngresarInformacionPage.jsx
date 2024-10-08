import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import { useEffect } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function IngresarInformacionPage() {
  const [value, setValue] = React.useState(dayjs(''));
  const [value2, setValue2] = React.useState(dayjs(''));
  const [informe, setInforme] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [estudiante, setEstudiante] = useState();
  const [usuarios, setUsuarios] = useState([])

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://educonnectb.onrender.com/asesores/estudiantes',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        `https://educonnectb.onrender.com/asesores/estudiantes/${estudianteId}/informes?fechaInicio=${value.$y}-${value.$M}-${value.$D}&fechaFin=${value2.$y}-${value2.$M}-${value2.$D}`,
        { contenido: informe },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Informe enviado:", response.data);
      setMensaje("Informe enviado con éxito");
      setEstudiante('');
      setInforme("");
      MySwal.fire({
        title: '¡Exito!',
        text: 'Calificación Ingresada',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

    } catch (error) {
      console.error("Error al enviar el Informe:", error);
      setError(
        "Error al enviar el Informe. Por favor, inténtalo de nuevo."
      );
    }
  };
  const handleEstudianteChange = (event) => {
    const selectedNombre = event.target.value;
    const selectedEstudiante = usuarios.find(usuario => usuario.nombre === selectedNombre);
    setEstudiante(selectedEstudiante.idUsuario);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Informe del Estudiante</h1>
          {mensaje && <p className="text-green-500 mb-4 text-center">{mensaje}</p>}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <datalist id="usuarios">
              {usuarios.filter(usuario => usuario.estado === 'ACTIVO').map((usuario) => (
                <option key={usuario.idUsuario} value={usuario.nombre}>{usuario.nombre}</option>
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
            <div>
              <label
                htmlFor="Fecha"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Fecha Inicio"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                  <DatePicker
                    label="Fecha Fin"
                    value={value2}
                    onChange={(newValue) => setValue2(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
