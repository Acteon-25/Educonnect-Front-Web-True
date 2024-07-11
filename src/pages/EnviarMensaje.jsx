import { useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'react-hook-form';

const EnviarMensaje = () => {

  const [nombre, setNombre] = useState('');
  const [asesores, setAsesores] = useState([]);
  const [toUser, setToUser] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const getNombre = () => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8080/estudiantes/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        console.log(res.data.correoElectronico)
        setNombre(res.data.nombre)
      })
  }

  const getAsesores = () => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8080/estudiantes/asesores", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setAsesores(res.data)
      })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({
          fromUser : nombre,
          toUser : toUser,
          subject : subject,
          body : body,
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex flex-col">
        <label htmlFor="nombre" className="mb-1 text-sm font-medium text-gray-700">
          fromUser:
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
          toUser:
        </label>
        <select
          id="asesores"
          name="asesores"
          onChange={handleChange}
          className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Selecciona un asesor</option>
          {asesores.map((asesor) => (
            <option key={asesor.idAsesor} value={asesor.usuario.nombre}>
              {asesor.usuario.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="tipoUsuario" className="mb-1 text-sm font-medium text-gray-700">
          subject:
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
          body:
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
  );
};

export default EnviarMensaje;
