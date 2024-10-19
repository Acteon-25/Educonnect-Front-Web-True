import SectionContainer from "../components/SectionContainer"
import { useNavigate } from 'react-router-dom'
import Profesor from '../img/ProfesorOscuro.jpeg'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from 'react'
import axios from 'axios'

const RegisterAsesorPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [nombre, setNombre] = useState();
  const [contrasena, setContrasena] = useState();
  const [especialidad, setEspecialidad] = useState()
  const [file, setFile] = useState(null);


  async function registrarAsesor() {
    const nuevoAsesor = {
      usuario: {
        correoElectronico: email,
        nombre: nombre,
        contrasena: contrasena,
      },
      especialidad: especialidad,
    }

    const formData = new FormData();
    formData.append('asesor', JSON.stringify(nuevoAsesor));
    formData.append('archivo', file);

    try {
      const response = await axios.post('https://educonnectb.onrender.com/registro/asesor', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      localStorage.setItem('token', response.data.tokenTemporal);
    } catch (e) {
      console.log(e);
    } finally {
      navigate('/')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registrarAsesor()
  }

  return (
    <>
      <Header />
      <SectionContainer className="grid p-5 gap-4 place-items-center
        sm:grid-cols-2 sm:py-12 sm:my-32
        md:place-items-center md:my-24 mt-20">
        <img src={Profesor} alt="" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" />
        <div className="">
          <h2 className="text-3xl font-bold text-center text-gray-800 py-2">Bienvenido</h2>
          <div className="border bg-sky-400 rounded-full py-2 px-4 grid grid-cols-2 gap-4">
            <button className="rounded-full text-white py-2 hover:bg-sky-600 transition duration-300" onClick={() => {
              navigate("/registerAlumno");
            }}>
              Registro de Alumno
            </button>
            <button className="bg-sky-500 rounded-full text-white py-2" onClick={() => {
              navigate("/registerAsesor");
            }}>
              Registro de Asesor
            </button>
          </div>
          <p className="py-2">Ingrese sus datos para registrarse como asesor en EduConnect</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-gray-700">Correo Electrónico:</label>
              <input
                type="email"
                placeholder="Ingrese su Correo Electrónico"
                className="border border-sky-500 rounded-full px-4 py-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="nombre" className="text-gray-700">Nombre:</label>
              <input type="text" placeholder="Ingrese su username" className="border border-sky-500 rounded-full px-4 py-1"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="contrasena" className="text-gray-700">Contraseña:</label>
              <input type="password" placeholder="Ingrese su contraseña" className="border border-sky-500 rounded-full px-4 py-1"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="especialidad" className="text-gray-700">Especialidad:</label>
              <input type="text" placeholder="Ingrese la especialidad" className="border border-sky-500 rounded-full px-4 py-1"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="Ingreso de archivos" className="text-gray-700">Ingreso de archivos:</label>
              <input
                type="file"
                id="contenido"
                placeholder="Ingrese sus archivos"
                onChange={(e) =>setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="contenido"
                className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-md text-gray-700 cursor-pointer transition duration-300 ${
                  file ? "border-green-500 bg-green-200" : "border-gray-300 bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {file ? "Archivo seleccionado" : "Seleccionar Contenido"}
              </label>
              
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

export default RegisterAsesorPage