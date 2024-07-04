import { useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function RegistrarAsesoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [asesores, setAsesores] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [dia, setDia] = useState();

  const onSubmit = (data) => {
    console.log(data);
    const dia = new Date(data.dia)
    console.log(dia);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAsesores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/estudiantes/asesores",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAsesores(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAsesores();
  }, []);

  const handleChange = (event) => {
    const selectedNombre = event.target.value;
    const selectedAsesor = asesores.find(
      (asesor) => asesor.usuario.nombre === selectedNombre
    );
    const selectedHorario = selectedAsesor.horarioDisponibilidad;
    setHorarios(selectedHorario);
  };

  const handleChangeDia = (event) => {
    const selectedFecha = event.target.value;
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado','domingo'];
    const selectedDia = diasSemana[new Date(selectedFecha).getDay()];

    const horarioSeleccionado = horarios[selectedDia];
    console.log(horarioSeleccionado);
  };
  

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

              <select id="asesores" name="asesores" onChange={handleChange}>
                <option value="">Seleccion Asesor</option>
                {asesores.map((asesor) => (
                  <option key={asesor.idAsesor} value={asesor.usuario.nombre}>
                    {asesor.usuario.nombre}
                  </option>
                ))}
              </select>

              {errors.asesor && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.asesor.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dia"
                className="block text-lg font-medium text-gray-700"
              >
                Dia:
              </label>
{/* 
              <select id="dia" name="dia" onChange={handleChangeDia}>
                <option value="">Selecciona el dia</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miercoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sabado</option>
                <option value="domingo">Domingo</option>
              </select> */}

              
              <input type="date" id="dia" name="dia"
              
              {...register("dia", {required: "Campo requerido"})}
              onChange={handleChangeDia}
               />

              {errors.asesor && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.asesor.message}
                </p>
              )}
            </div>

            {/* <datalist id="fechasDisponibles">
              {horarios.map(horario => (
                <option value={horario}></option>
              ))}
            </datalist> */}
            <div>
              <label
                htmlFor="sesion"
                className="block text-lg font-medium text-gray-700"
              >
                Fechas Disponibles:
              </label>

              <input
                {...register("fecha", {
                  required: "Campo Requerido",
                })}
                list="fechasDisponibles"
                id="fecha"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              {errors.fecha && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.fecha.message}
                </p>
              )}
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
  );
}

export default RegistrarAsesoria;
