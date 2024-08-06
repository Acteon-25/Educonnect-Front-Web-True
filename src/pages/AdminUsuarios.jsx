import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminUsuarios() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);

  const rename = (tipoUsuario) => {
    switch (tipoUsuario) {
      case "PENDIENTE_PAGO":
        return "Pago Pendiente";
      case "PENDIENTE_APROBACION":
        return "Aprobación Pendiente";
    }

    return (
      tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1).toLowerCase()
    );
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://educonnectb.onrender.com/admin/usuarios",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        const mutacion = data.map((el) => ({
          idUsuario: el.idUsuario,
          nombre: el.nombre,
          correo: el.correoElectronico,
          tipoUsuario: el.tipoUsuario,
          estado: rename(el.estado),
        }));
        setUsuarios(mutacion);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchUsuarios();
  }, []);

  console.log(usuarios);

  const handleClickEdit = (idUsuario) => {
    navigate(`/dashboard/usuarios/${idUsuario}`);
  };

//   const handleClickDelete = (idUsuario) => {
//     const eliminarUsuario = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No hay token disponible");
//         }

//         await axios.delete(`http://localhost:8080/admin/usuarios/${idUsuario}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert("Eliminado");
//       } catch (error) {
//         console.error("Error al obtener datos del usuario:", error);
//       }
//     };

//     eliminarUsuario();
//   };

  return (
    <div className="min-h-screen flex bg-gray-100 mt-10">
      <div className="flex-1 min-w-0">
        <div className="py-10 px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Lista de Usuarios
          </h1>
          <div className="w-full max-w-6xl mx-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Usuario ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Nombre
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Correo
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Tipo de Usuario
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    } cursor-pointer hover:bg-gray-200`}
                    onClick={() => handleClickEdit(row.idUsuario)}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-4 px-4 border-b border-gray-200 text-gray-700 text-sm"
                      >
                        {cellIndex === 1 ? <div>{cell}</div> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminUsuarios;
