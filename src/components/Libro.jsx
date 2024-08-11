import DescargarLink from "./DescargarLink"

const Libro = ({ title, imgUrl, idContenido }) => {

  return (
    <li className="shadow-md rounded-lg">
      <div className='w-72 grid grid-cols-1 grid-rows-1'>
        <div className="static w-full h-[380px]">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-[300px]"
          />
          <div className="static bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h3 className="text-lg font-semibold text-white text-center truncate">{title}</h3>
          </div>
        </div>
        <DescargarLink contenidoId={idContenido}></DescargarLink>
      </div>
    </li>
  )
}

export default Libro