import React, { useState, useEffect,useContext } from "react";
import { CollaresContext } from "../context/CollaresProvider";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import "../index.css";
import axios from "axios";
import { ENDPOINT } from "../utils/constants";

function Perfil() {
  const { setIsLoggedIn } = useContext(CollaresContext); 
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    pais: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(ENDPOINT.users, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ajusta los nombres de los campos según la respuesta del backend
        setUser({
          nombre: response.data.nombre, 
          email: response.data.email, 
          direccion: response.data.direccion, 
          ciudad: response.data.ciudad, 
          pais: response.data.pais 
        }); 

      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        // Manejar el error, por ejemplo, redirigiendo al usuario a la página de inicio de sesión
        if (error.response.status === 401) {
          setIsLoggedIn(0);
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          window.alert("Token inválido o expirado. Por favor, inicia sesión nuevamente.");
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(ENDPOINT.users, user, { // Asumiendo que el endpoint para actualizar es el mismo que para obtener
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cambios guardados");
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      alert("Error al guardar los cambios.");
    }
  };

  const handleSavePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("Las contraseñas no coinciden");
    } else {
      try {
        const token = localStorage.getItem('token');
        // Aquí se necesita agregar la lógica para enviar la nueva contraseña al backend
        // usando una petición PUT o PATCH a un endpoint específico para cambiar contraseña
        // Ejemplo:
        // await axios.patch(ENDPOINT.cambiarPassword, { password: password.newPassword }, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        alert("Contraseña cambiada con éxito"); 
      } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        alert("Error al cambiar la contraseña.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Titulo titulo="Mi Perfil" />
      <div className="container perfil-container">
        
        <div className="perfil-content">
          {/* Sección del perfil */}
          <div className="perfil-form">
            <h3>Mis Datos</h3>
            <div className="perfil-form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input 
                type="text"
                id="nombre"
                name="nombre"
                value={user.nombre}
                onChange={handleInputChange}
                disabled 
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={user.email} 
                onChange={handleInputChange}
                disabled 
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input 
                type="text"
                id="direccion" 
                name="direccion" 
                value={user.direccion} 
                onChange={handleInputChange}
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="ciudad">Ciudad:</label>
              <input 
                type="text" 
                id="ciudad" 
                name="ciudad" 
                value={user.ciudad} 
                onChange={handleInputChange}
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="pais">País:</label>
              <select 
                id="pais" 
                name="pais" 
                value={user.pais} 
                onChange={handleInputChange}
              >
                <option value="Chile">Chile</option>
                <option value="Perú">Perú</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
            <button className="perfil-save-button" onClick={handleSaveProfile}>
              Guardar Cambios
            </button>
          </div>

          {/* Sección del formulario de cambio de contraseña */}
          <div className="perfil-password">
            <h3>Cambiar Contraseña</h3>
            <div className="perfil-form-group">
              <label htmlFor="currentPassword">Contraseña Actual:</label>
              <input 
                type="password" 
                id="currentPassword" 
                name="currentPassword" 
                value={password.currentPassword} 
                onChange={handlePasswordChange}
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="newPassword">Nueva Contraseña:</label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                value={password.newPassword} 
                onChange={handlePasswordChange}
              />
            </div>
            <div className="perfil-form-group">
              <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
              <input 
                type="password"
                id="confirmPassword" 
                name="confirmPassword" 
                value={password.confirmPassword} 
                onChange={handlePasswordChange}
              />
            </div>
            <button className="perfil-save-button" onClick={handleSavePassword}>
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
