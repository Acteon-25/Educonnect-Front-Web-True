import { useEffect, useState } from 'react'
import Libro from '../components/Libro';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionContainer from '../components/SectionContainer';
import axios from "axios";

const BibliotecaPage = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://biblioteca-digital-api-production.up.railway.app/api/contenido')
      .then(response => {
        setData(response.data);
        console.log(response.data);

      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (

    <>
      <Header />
      <SectionContainer className="py-8 px-5 lg:w-auto place-items-center my-0">
        <h2 className='text-4xl'>Libros de la Biblioteca</h2>
        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quod sequi, magnam ipsam debitis excepturi?</p>
      </SectionContainer>

      <SectionContainer className="py-8 px-5 lg:w-auto place-items-center my-4">

        <ul className='grid grid-cols-3 gap-4 my-4 justify-items-center '>
          {data?.map((item) => (
            <Libro key={item._id} title={item.titulo} imgUrl={item.caratula} idContenido={item._id}></Libro>

          ))}
        </ul>

      </SectionContainer>
      <Footer />
    </>
  );
};
export default BibliotecaPage;