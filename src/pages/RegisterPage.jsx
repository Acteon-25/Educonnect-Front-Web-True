import SectionContainer from "../components/SectionContainer"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alumno from '../img/AlumnoOscuro.jpeg'
import Header from "../components/Header"
import Footer from "../components/Footer"
import axios from 'axios'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [nombre, setNombre] = useState();
  const [contrasena, setContrasena] = useState();

  async function crearEstudiante() {
    try {
      const nuevoEstudiante = {
        nombre: nombre,
        correoElectronico: email,
        contrasena: contrasena,
      };
      const response = await axios.post('https://educonnectb.onrender.com/registro/estudiante', nuevoEstudiante);
      localStorage.setItem('token', response.data.tokenTemporal);
      navigate('/pricing/')
    } catch (e) {
      console.log('Error al crear usuario', e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    crearEstudiante()
  }

  return (
    <>
      <Header />
      <SectionContainer className="grid p-5 gap-4 place-items-center
        sm:grid-cols-2 sm:py-12 sm:my-32
        md:place-items-center md:my-24 mt-20">
        <img src={Alumno} alt="" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" />
        <div className="">
          <h2 className="text-3xl font-bold text-center text-gray-800 py-2">Bienvenido</h2>
          <div className="border bg-sky-400 rounded-full py-2 px-4 grid grid-cols-2 gap-4">
            <button className="bg-sky-500 rounded-full text-white py-2" onClick={() => {
              navigate("/registerAlumno");
            }}>
              Registro de Alumno
            </button>
            <button className="rounded-full text-white py-2 hover:bg-sky-600 transition duration-300" onClick={() => {
              navigate("/registerAsesor");
            }}>
              Registro de Asesor
            </button>
          </div>
          <p className="py-2">Ingrese sus datos para registrarse como alumno en EduConnect</p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-gray-700">Correo Electrónico:</label>
              <input
                type="email"
                placeholder="Ingrese su Correo Electrónico"
                className="border border-sky-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 col-span-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="nombre" className="text-gray-700">Nombre:</label>
              <input
                type="text"
                placeholder="Ingrese su username"
                className="border border-sky-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 col-span-2 w-full"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="contrasena" className="text-gray-700">Contraseña:</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="border border-sky-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 col-span-2 w-full"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                minLength="8" />
            </div>
            <div className="border rounded-full py-3 px-4 grid grid-cols-1">
              <button className="bg-sky-500 hover:bg-blue-700 w-full transition duration-300 rounded-full text-white px-6 py-2 block my-4" >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </SectionContainer>
      <Footer />
    </>
  )
}

export default RegisterPage