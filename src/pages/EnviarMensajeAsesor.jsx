import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBarAsesor';
import SectionContainer from '../components/SectionContainer';

const EnviarMensajeAsesor = () => {

  const [nombre, setNombre] = useState('');
  const [asesores, setAsesores] = useState([]);
  const [toUser, setToUser] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const getNombre = () => {
    const token = localStorage.getItem('token');
    axios.get("https://educonnectb.onrender.com/asesores/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setNombre(res.data.usuario.nombre)
      })
  }

  const getAsesores = () => {
    const token = localStorage.getItem('token');
    axios.get("https://educonnectb.onrender.com/asesores/estudiantes", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setAsesores(res.data)
      })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://educonnectb.onrender.com/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({
          fromUser: nombre,
          toUser: toUser,
          subject: subject,
          body: body,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const NombreAsesor = event.target.value;
    setToUser(NombreAsesor);
  };

  useEffect(() => {
    getNombre();
    getAsesores();
  }, []);

  return (
    <div className="pt-14 flex justify-center items-start min-h-screen">
      <SideBar />
      <SectionContainer className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-1 text-sm font-medium text-gray-700">
              Usuario:
            </label>
            <input
              type="text"
              disabled={true}
              value={nombre}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="correoElectronico" className="mb-1 text-sm font-medium text-gray-700">
              Destino:
            </label>
            <select
              id="asesores"
              name="asesores"
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Selecciona un asesor</option>

              {asesores.map((asesor) => (
                <option key={asesor.idUsuario} value={asesor.nombre}>
                  {asesor.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipoUsuario" className="mb-1 text-sm font-medium text-gray-700">
              Asunto:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="estado" className="mb-1 text-sm font-medium text-gray-700">
              Mensaje:
            </label>
            <input
              type="text"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar cambios
          </button>
        </form>
      </SectionContainer>
    </div>
  );
};

export default EnviarMensajeAsesor;
