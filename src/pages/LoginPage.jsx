import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Alumno from '../img/AlumnoOscuro.jpeg';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionContainer from "../components/SectionContainer";
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [contrasena, setContrasena] = useState();

  async function login() {
    try {
      const details = {
        correoElectronico: email,
        contrasena: contrasena,
      }

      const response = await axios.post('https://educonnectb.onrender.com/login', details);
      const token = response.data.token;
      const tipoUsuario = response.data.tipoUsuario;
      localStorage.setItem('token', token);

      if (tipoUsuario == "ESTUDIANTE") {
        const resEstudiante = await axios.get("https://educonnectb.onrender.com/estudiantes/perfil", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const ruta = resEstudiante.data.idUsuario
        localStorage.setItem('id', ruta);
        localStorage.setItem('idEstudiante', ruta);
        localStorage.setItem('idNotificacion', ruta);
        localStorage.setItem('tipoUsuario', tipoUsuario)
        navigate(`/login/${ruta}`)

      } else if (tipoUsuario == "ASESOR") {

        const resAsesor = await axios.get("https://educonnectb.onrender.com/asesores/perfil", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const ruta = resAsesor.data.usuario.idUsuario
        const ruta2 = resAsesor.data.idAsesor
        localStorage.setItem('id', ruta2)
        localStorage.setItem('idAsesor', ruta);
        localStorage.setItem('idNotificacion', ruta);
        localStorage.setItem('tipoUsuario', tipoUsuario)
        navigate(`/login/asesor/${ruta}`)

      } else if (tipoUsuario == "ADMIN") {
        navigate("/dashboard")
      }
    } catch (e) {
      alert("Credenciales Incorrectas")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login()
  }

  return (
    <>
      <Header />
      <SectionContainer
        className="grid p-5 gap-4 place-items-center
        sm:grid-cols-2 sm:py-16 sm:my-32
        md:place-items-center md:my-24 mt-20">
        <img src={Alumno} alt="" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" />
        <form onSubmit={handleSubmit} className="px-4 ">
          <h2 className="text-3xl font-bold text-center">Bienvenido</h2>
          <p className="text-center text-gray-700 text-lg pt-4">Es necesario iniciar sesión en Educonnect para acceder al contenido </p>
          <div>

          </div>
          <h3 className="text-gray-700">Correo</h3>
          <input
            type="text"
            placeholder="Ingrese su Correo"
            className="border border-sky-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 col-span-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <h3 className="text-gray-700">Contraseña</h3>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            className="border border-sky-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 col-span-2 w-full"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)} />

          <div className="border rounded-full py-3 px-4 grid grid-cols-1">
            <button className="bg-sky-500 rounded-full text-white px-6 py-2 block my-4" >
              Iniciar Sesion
            </button>
          </div>
          <div className="text-center">
            <Link className="text-sky-500 hover:text-sky-900 transition duration-300 underline font-medium" to="/restablecer-clave">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              ¿Eres nuevo en EduConnect?
            </p>
            <Link className="text-blue-500 hover:text-sky-700 transition duration-300 underline font-medium" to="/registerAlumno">
              Regístrate
            </Link>
          </div>
        </form>
      </SectionContainer>
      <Footer />
    </>
  );
};

export default LoginPage;
