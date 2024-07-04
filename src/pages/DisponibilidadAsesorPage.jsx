import axios from "axios";
import { useState } from "react";

const id = localStorage.getItem("id")

function DisponibilidadAsesorPage() {


  


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



  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Horario del Asesor</h1>

          <form onSubmit={handleSubmit}>

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
