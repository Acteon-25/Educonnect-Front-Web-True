import { useEffect, useState } from 'react'
import SideBar from '../components/SideBarAsesor'
import Buscador from '../icons/Buscador.svg'
import Notification from '../icons/Notification.svg'
import Foto from '../img/Foto.png'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const token = localStorage.getItem("token")
const id = localStorage.getItem('id')

const LoginUserAsesorPage = () => {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [asesores, setAsesores] = useState([]);

  const getNombre = () => {
    axios.get("https://educonnectb.onrender.com/asesores/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setNombre(res.data.usuario.nombre)
        console.log(res.data.usuario.nombre)
        const nombreActual = res.data.usuario.nombre
        localStorage.setItem('nombreActual', nombreActual);
        console.log(res.data)
      })
  }

  const getSesionesSolicitadas = () => {
    axios.get(`https://educonnectb.onrender.com/asesores/${id}/sesiones`, {
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
        `https://educonnectb.onrender.com/asesores/${idSesion}`,
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
    <div className="">
      <SideBar />

      <div className='flex px-10 pb-10 pt-20 gap-4 w-screen justify-between'>
        <div className='flex float-right  gap-1'>
          <button onClick={clearLocalStorage}>Cerrar Sesion</button>
          <img src={Buscador} alt="" />
          <input type="text" placeholder='Buscar' />
        </div>
        <div className='flex float-left gap-4'>
          <img src={Notification} alt="" />
          <img src={Foto} alt="" className='size-12 rounded-full' />
          <h2>Bienvenido {nombre}</h2>
          <p>Asesor</p>
        </div>
      </div>

      <div className='grid grid-cols-3 place-items-center'>
        <div>
          Asesorias
        </div>
        <div >
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
                    <a href={`/login/asesor/${id}`}>
                    <button onClick={() => handleDelete(asesor.idSesion)} className=" justify-self-end border border-gray-300 rounded-lg py-1 px-3 bg-white hover:bg-gray-50">
                      Eliminar
                    </button>
                    </a>
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

export default LoginUserAsesorPage