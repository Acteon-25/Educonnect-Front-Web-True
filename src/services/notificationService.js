import axios from "axios";

const notificationService = {
  getNotifications: async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/notiftopic/${userId}/notificaciones`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  markAllAsRead: async (userId, token) => {
    try {
      await axios.delete(
        `http://localhost:8080/notiftopic/${userId}/notificaciones`, 
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    } catch (e) {
      console.log(e);
    }
  },
  markAsRead: async (userId,indiceNotificacion,token) => {
    caches,getComputedStyle
    try {
      await axios.delete(
        `http://localhost:8080/notiftopic/${userId}/notificaciones/${indiceNotificacion}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    } catch (e) {
      console.log(e);
    }

    
  },
};

export default notificationService;
