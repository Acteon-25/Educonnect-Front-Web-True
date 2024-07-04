// import { useState } from "react";
// import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import { useForm } from 'react-hook-form'
// Instalar npm install react-hook-form

function CalificarEstudiante() {
  // const [nota, setNota] = useState("");
  // const [comentario, setComentario] = useState("");
  // const [mensaje, setMensaje] = useState(null);
  // const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }



  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Calificar Estudiante
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="estudiante"
                className="block text-lg font-medium text-gray-700"
              >
                Estudiante:
              </label>
              <input
                {...register('estudiante', { 
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Maximo caracteres 20'
                  }})}
                type="text"
                id="estudiante"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
               {errors.estudiante && <p className="text-red-600 mt-2 text-sm">{errors.estudiante.message}</p>}
            </div>
            <div>
              <label
                htmlFor="sesion"
                className="block text-lg font-medium text-gray-700"
              >
                Sesión:
              </label>
              
              <input
                {...register('sesion', { 
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Maximo caracteres 20'
                  }})}
                type="text"
                id="sesion"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
               {errors.sesion && <p className="text-red-600 mt-2 text-sm">{errors.sesion.message}</p>}
            </div>
            <div>
              <label
                htmlFor="materia"
                className="block text-lg font-medium text-gray-700"
              >
                Materia:
              </label>
              <input
                {...register('materia', { 
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Maximo caracteres 20'
                  }})}
                type="text"
                id="materia"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
               {errors.materia && <p className="text-red-600 mt-2 text-sm">{errors.materia.message}</p>}
            </div>
            
            <div>
              <label
                htmlFor="nota"
                className="block text-lg font-medium text-gray-700"
              >
                Calificacion:
              </label>
              <input
                {...register('calificacion', { 
                  required: 'Campo Requerido',
                  max: {
                    value: 20,
                    message: 'Maximo de nota 20'
                  }})}
                type="number"
                id="nota"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
               {errors.calificacion && <p className="text-red-600 mt-2 text-sm">{errors.calificacion.message}</p>}
            </div>


            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded w-full transition duration-300"
            >
              Enviar Calificación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CalificarEstudiante;
