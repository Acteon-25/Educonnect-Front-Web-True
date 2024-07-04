import axios from "axios";
import { useState } from "react";

const id = localStorage.getItem("id")

function DisponibilidadAsesorPage() {

  const [lunes, setLunes] = useState([""])
  const [martes, setMartes] = useState([""])

<<<<<<< HEAD
  
=======
  const handleChangeLunes = (event) => {
    setLunes(event.target.value);
  };
>>>>>>> 8735a75034236d03ea78d6b9819f377ac00fb8cb

  const handleChangeMartes = (event) => {
    setMartes(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(id)
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:8080/asesores/${id}/horario`,
        {
          lunes: lunes,
          martes: martes
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

<<<<<<< HEAD


=======
>>>>>>> 8735a75034236d03ea78d6b9819f377ac00fb8cb
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Horario del Asesor</h1>

<<<<<<< HEAD
          <form onSubmit={handleSubmit}>
=======
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lunes
              </label>
              <select
                id="lunes"
                name="lunes"
                value={lunes}
                onChange={handleChangeLunes}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="09:00-12:00">09:00-12:00</option>
                <option value="13:00-16:00">13:00-16:00</option>
                <option value="17:00-20:00">17:00-20:00</option>
                <option value="">Ninguna</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Martes
              </label>
              <select
                id="martes"
                name="martes"
                value={martes}
                onChange={handleChangeMartes}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="09:00-12:00">09:00-12:00</option>
                <option value="13:00-16:00">13:00-16:00</option>
                <option value="17:00-20:00">17:00-20:00</option>
                <option value="">Ninguna</option>
              </select>
            </div>
>>>>>>> 8735a75034236d03ea78d6b9819f377ac00fb8cb

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
