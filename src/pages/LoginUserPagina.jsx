import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Buscador from '../icons/Buscador.svg'
import Foto from '../img/Foto.png'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import Notifications from '../components/Notifications'
import Fondo from '../img/FondoHector.png'

const token = localStorage.getItem("token")
const id = localStorage.getItem('id')

const LoginUserPage = () => {
  const navigate = useNavigate()
  const [asesores, setAsesores] = useState([]);

  const [nombre, setNombre] = useState('')

  const getNombre = () => {
    axios.get("http://localhost:8080/estudiantes/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setNombre(res.data.nombre)
      })
  }

  const getSesionesSolicitadas = () => {
    axios.get(`http://localhost:8080/estudiantes/${id}/sesiones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        const filtro = response.data.filter(sesion => sesion.estado === "PROGRAMADA")
        console.log(filtro)
        setAsesores(filtro);
      })
  }

  const handleDelete = async (idSesion) => {
    try {
      await axios.delete(
        `http://localhost:8080/sesiones/${idSesion}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Asesor eliminado:", id);
    } catch (error) {
      console.error("Error al eliminar asesor:", error);
    }
  };

  useEffect(() => {
    getNombre();
    getSesionesSolicitadas();
  }, []);


  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundImage: `url(${Fondo})` }} className='bg-cover bg-no-repeat bg-center h-screen bg-transparent' >

      <SideBar />

      <div className='flex px-10 pb-10 pt-20 gap-4 w-screen justify-between'>
        <div className='flex float-right  gap-1'>

          <button onClick={clearLocalStorage}>Cerrar Sesion</button>

          <img src={Buscador} alt="" />
          <input type="text" placeholder='Buscar' />
        </div>
        <div className='flex float-left gap-4'>
          <button className=' bg-green-500 rounded-xl py-1 px-3'> + Nueva Asesoria</button>
          <Notifications />
          <img src={Foto} alt="" className='size-12 rounded-full' />
          <h2>Bienvenido {nombre}</h2>
          <p>Alumno</p>
        </div>
      </div>

      <div className='grid grid-cols-3 place-items-center'>

        <div className='flex flex-col gap-4'>
          Asesorias
        </div>



        <div className='flex flex-col gap-4'>
          Tareas
        </div>

        <div className="w-auto max-w-3xl bg-gray-300 shadow-md rounded-lg ">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Sesiones</h2>
          </div>
          {asesores.map((asesor) => (
            <div>
              <div className="p-4 space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-gray-100 p-4">
                    <div className="space-y-1">
                      <div className="font-medium">{asesor.asesor.usuario.nombre}</div>
                      <div className="text-sm text-gray-500">{`${asesor.fechaHora.split('T')[0]} ${asesor.fechaHora.split('T')[1]}`}</div>

                    </div>

                    <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">PROGRAMADO</div>
                    <Link to={asesor.urlJitsi} className='text-blue-500 hover:text-blue-700'>
                      Enlace a la sesion
                    </Link>
                    <button className=" justify-self-end border border-gray-300 rounded-lg py-1 px-3 bg-white hover:bg-gray-50">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginUserPage