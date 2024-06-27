import DescargarLink from "./DescargarLink"

const Libro = ({ title, imgUrl, idContenido }) => {

  return (
    <div className='size-72 place-content-center'>
      <h3 className="text-md text-center font-bold">{title}</h3>
      <img src={imgUrl} alt={imgUrl} className="w-full  h-[200px] rounded-xl" />
      <DescargarLink contenidoId={idContenido}></DescargarLink>
    </div>
  )
}

export default Libro