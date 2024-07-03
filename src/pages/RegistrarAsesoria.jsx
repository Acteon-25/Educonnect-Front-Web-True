// import { useState } from "react";
// import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import { useForm } from 'react-hook-form'


function RegistrarAsesoria() {

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
            Registrar Asesoria
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="asesor"
                className="block text-lg font-medium text-gray-700"
              >
                Asesor:
              </label>
              <input
                {...register('asesor', { 
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Maximo caracteres 20'
                  }})}
                type="text"
                id="asesor"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
               {errors.asesor && <p className="text-red-600 mt-2 text-sm">{errors.asesor.message}</p>}
            </div>
            <div>
              <label
                htmlFor="sesion"
                className="block text-lg font-medium text-gray-700"
              >
                Fechas Disponibles:
              </label>
              
              <input
                {...register('fecha', { 
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Maximo caracteres 20'
                  }})}
                list="fechasDisponibles"
                id="fecha"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              
               {errors.fecha && <p className="text-red-600 mt-2 text-sm">{errors.fecha.message}</p>}
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



            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded w-full transition duration-300"
            >
              Registrar Asesoria
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrarAsesoria