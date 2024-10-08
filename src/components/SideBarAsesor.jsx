import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const id = localStorage.getItem('idAsesor')

const SideBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='bg-white py-3 fixed top-0 left-0 right-0 shadow-md'>
      <button className='ml-4' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>
      <div className={`${open ? "w-80" : "w-0"} bg-cyan-600 min-h-screen fixed top-0 left-0 transition-all duration-300`}>
        <div className={`${!open && "hidden"} pt-3`}>
          <button className='ml-4 text-white mb-14' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <a href={`/login/asesor/${id}`}>Inicio</a>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/aceptarSesionAsesor">Aceptar Sesion</Link>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/asesor/ingresarInformacion">Ingresar Informe</Link>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/asesor/ingresarCalificacion">Ingresar Calificación</Link>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/asesor/perfilAsesor">Editar Perfil</Link>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/enviarMensajeAsesor">Mensaje</Link>
          </div>
          <div className='text-center text-white text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
            <Link to="/disponibilidad">Editar Disponibilidad</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar