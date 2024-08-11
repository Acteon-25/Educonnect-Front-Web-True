/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Buscador from '../icons/Buscador.svg';
import Foto from '../img/Foto.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Notifications from '../components/Notifications';
import Fondo from '../img/FondoHector.png';
import Sesiones from '../components/Sesiones'; 

const token = localStorage.getItem("token");
const id = localStorage.getItem('id');

const LoginUserPage = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  const getNombre = () => {
    axios.get("https://educonnectb.onrender.com/estudiantes/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setNombre(res.data.nombre);
      });
  };

  useEffect(() => {
    getNombre();
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundImage: `url(${Fondo})` }} className='bg-cover bg-no-repeat bg-center h-screen bg-transparent'>
      <SideBar />

      <div className='flex px-10 pb-20 pt-20 gap-4 w-screen justify-between'>
        <div className='flex items-center gap-2'>
          <img src={Buscador} alt="" className="h-7 w-7" />
          <input type="text" placeholder='Buscar' className="py-2 px-36 border focus:outline-none rounded-xl shadow-xl focus:border-violet-500 focus:ring focus:ring-violet-600 focus:ring-opacity-70 pl-2" />
        </div>

        <div className='flex items-center gap-4'>
          <Link className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300" to="/registrarAsesoria">
            + Nueva Asesoría
          </Link>
          <Notifications />
          <img src={Foto} alt="" className='size-12 rounded-full' />
          <h2 className="font-bold text-gray-800">Bienvenido {nombre}</h2>
          <p className="font-semibold text-gray-700">Alumno</p>
          <button onClick={clearLocalStorage} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">Cerrar Sesión</button>
        </div>
      </div>

      <div className='grid grid-cols-3 place-items-center'>
        <div className='w-auto max-w-3xl bg-gray-300 shadow-md rounded-lg'>
          <div className='p-4 border-b'>
            <h2 className='text-xl font-semibold'>Asesorias</h2>
          </div>
        </div>

        <div className='w-auto max-w-3xl bg-gray-300 shadow-md rounded-lg'>
          <div className='p-4 border-b'>
            <h2 className='text-xl font-semibold'>Tareas</h2>
          </div>
        </div>
        
        <div className='w-auto max-w-3xl bg-gray-300 shadow-md rounded-lg'>
          <div className='p-4 border-b'>
            <Sesiones userId={id} /> {/* Usar Sesiones */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUserPage;
