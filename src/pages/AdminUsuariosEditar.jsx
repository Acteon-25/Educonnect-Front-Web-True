import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminUsuariosEditar() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token disponible");
        }

        const response = await axios.get(
          `https://educonnectb.onrender.com/admin/usuarios/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    obtenerDatosUsuario();
  }, [id]);

  const onSubmit = (data) => {
    const newUser = {
      nombre: data.nombre ? data.nombre : usuario.nombre,
      correoElectronico: data.correo ? data.correo : usuario.correoElectronico,
      tipoUsuario: data.tipoUsuario ? data.tipoUsuario : usuario.tipoUsuario,
      estado: data.estado ? data.estado : usuario.estado,
    };
    console.log(newUser);

    const enviarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token disponible");
        }

        await axios.put(`https://educonnectb.onrender.com/admin/usuarios/${id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Actualizado");
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    enviarDatos();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Perfil Usuario
        </h1>
        <form
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="nombre"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={usuario.nombre}
              {...register("nombre")}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="correoElectronico"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              name="correoElectronico"
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={usuario.correoElectronico}
              {...register("correo")}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="tipoUsuario"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Tipo Usuario:
            </label>
            <input
              type="tipoUsuario"
              disabled
              name="tipoUsuario"
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={usuario.tipoUsuario}
              {...register("tipoUsuario")}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="estado"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Estado:
            </label>
            <select
              name="estado"
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("estado")}
            >
              <option value="">{usuario.estado}</option>
              <option value="INACTIVO">INACTIVO</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUsuariosEditar;
