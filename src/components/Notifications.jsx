import {useState, useEffect} from 'react';
import notificationService from '../services/notificationService';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const user = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const data = await notificationService.getNotifications(user, token);
          console.log(data);
          setNotifications(data);
        } catch (error) {
          console.error('Error al obtener notificaciones:', error);
        }
      }
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [user, token]);

  const handleNewNotification = (notification) => {
    setNotifications(prevNotifications => [...prevNotifications, notification]);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(user,notificationId, token);
      setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== notificationId)); 
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
    }


  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(user,token);
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
    }


  };

  console.log(notifications);

  return (
    <div className="relative">
      {/* Icono de campana con contador */}
      <button onClick={toggleNotifications} className="relative">
        <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Contenedor de notificaciones (se muestra si showNotifications es true) */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg">
          <div className="p-2 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notificaciones</h3>
            <button onClick={handleMarkAllAsRead} className="text-blue-500 hover:underline">Marcar todas como leídas</button>
          </div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="p-2 border-b">
                  <p>{notification.mensaje}</p>
                  <p className="text-xs text-gray-500">{notification}</p>
                  {!notification.leido && ( // Solo mostrar el botón si la notificación no ha sido leída
                    <button onClick={() => handleMarkAsRead(index)} className="text-blue-500 hover:underline">
                      Marcar como leída
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No tienes notificaciones.</li>
            )}
          </ul>
        </div>
      )}
 </div>
);
}

export default Notifications