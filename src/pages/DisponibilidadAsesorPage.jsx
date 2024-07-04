import axios from "axios";
import { useState } from "react";

const id = localStorage.getItem("id")

function DisponibilidadAsesorPage() {


  const [horarios, setHorarios] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(id)
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:8080/asesores/${id}/horario`,
        {
          lunes: ["09:00-12:00", "14:00-18:00"],
          martes: []
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },

      );

    } catch (error) {
      console.error("Error al enviar el horario:", error);
    }
  };

  const handleChange = (event) => {
      console.log(event.target.options);
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Horario del Asesor</h1>

          <form onSubmit={handleSubmit}>
            <select id="horarios" name="horarios" required onChange={handleChange}>
              <optgroup label="Mañana">
                <option value="09:00-12:00">09:00 - 12:00</option>
              </optgroup>
              <optgroup label="Tarde">
                <option value="14:00-18:00">14:00 - 18:00</option>
              </optgroup>
              <optgroup label="Noche">
                <option value="18:00-22:00">18:00 - 22:00</option>
              </optgroup>
              <option value="">Sin disponibilidad</option>
            </select>

            <input list="intervalos" />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Enviar Horario
            </button>

          </form>


        </div>
      </div>
    </div>
  );
}

export default DisponibilidadAsesorPage;
