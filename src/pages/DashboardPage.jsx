import { Link, useNavigate } from 'react-router-dom';
import Foto from '../img/Foto.png';
import axios from 'axios';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const DashboardPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(dayjs(''));
  const [value2, setValue2] = React.useState(dayjs(''));

  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  async function fetchGanancias() {
    try {
      const response = await axios.get('/reportes/ganancias', {
        params: {
          inicio: `${value.$y}-${value.$M}-${value.$D}T00:00:00`,
          fin: `${value2.$y}-${value2.$M}-${value2.$D}T23:59:59`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ganancias data:', error);
    }
  }

  async function renderGananciasChart() {
    const data = await fetchGanancias();

    // Suponiendo que data tiene la estructura { gananciasTotales, pagos }
    const labels = data.pagos.map(pago => pago.fecha); // Extrae las fechas de los pagos
    const values = data.pagos.map(pago => pago.monto); // Extrae los montos de los pagos

    const ctx = document.getElementById('gananciasChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ganancias',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }

  useEffect(() => {
    fetchGanancias();
    renderGananciasChart();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-wrap items-center justify-between px-10 py-5 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src={Foto} alt="Perfil" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Bienvenido</h2>
            <p className="text-gray-600">Admin</p>
          </div>
        </div>

        <button onClick={clearLocalStorage}>Cerrar Sesion</button>
      </div>

      <div className="flex flex-col items-center justify-center h-full py-10">
        <h3 className="text-4xl font-semibold text-gray-700 mb-6">
          Ingresar Archivos a la Biblioteca
        </h3>
        <Link
          to="/ingresarArchivosBiblioteca"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Ingresar Archivos
        </Link>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="Fecha Inicio"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <DatePicker
            label="Fecha Fin"
            value={value2}
            onChange={(newValue) => setValue2(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <div>
        <canvas id="gananciasChart"></canvas>
      </div>
    </div>
  );
};

export default DashboardPage;
