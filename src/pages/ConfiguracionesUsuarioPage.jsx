import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const tokenCancelar = localStorage.getItem("token")

function ConfiguracionesUsuarioPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    axios.delete("http://localhost:8080/membresias/cancelar", {
      headers: {
        'Authorization': `Bearer ${tokenCancelar}`
      }
    })
    console.log(tokenCancelar)
    alert("Membresia cancelada con exito")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button className='bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded' onClick={() => navigate(-1)}>Volver</button>
      <button
        onClick={handleClick}
        className="bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancelar Membresia
      </button>
    </div >
  );
}

export default ConfiguracionesUsuarioPage;
