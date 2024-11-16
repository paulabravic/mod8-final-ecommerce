import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import "../index.css";

function Perfil() {
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    address: "Calle Alameda 123",
    city: "Santiago",
    country: "Chile",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

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

  const handleSaveProfile = () => {
    alert("Cambios guardados");
    // Aquí puedes agregar la lógica para guardar los cambios del perfil
  };

  const handleSavePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("Las contraseñas no coinciden");
    } else {
      alert("Contraseña cambiada con éxito");
      // Aquí agregarías la lógica para cambiar la contraseña
    }
  };

  return (
      <>
      <Navbar />
      <Titulo titulo="Mi Perfil" />
    <div className="perfil-container mb-5">
      {/* <h2>Perfil de Usuario</h2> */}
      <div className="perfil-content">
        {/* Sección del perfil */}
       
        <form className="perfil-form">
        <h5>Mis Datos</h5>
          <div className="perfil-form-group mt-3">
            <label>Nombre:</label>
            <input type="text" value={user.name} disabled />
          </div>

          <div className="perfil-form-group">
            <label>Email:</label>
            <input type="email" value={user.email} disabled />
          </div>

          <div className="perfil-form-group">
            <label>Dirección:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="perfil-form-group">
            <label>Ciudad:</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="perfil-form-group">
            <label>País:</label>
            <select
              name="country"
              value={user.country}
              onChange={handleInputChange}
            >
              <option value="Chile">Chile</option>
              <option value="Perú">Perú</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>

          <button type="button" className="perfil-save-button" onClick={handleSaveProfile}>
            Guardar Cambios
          </button>
        </form>

        {/* Sección del formulario de cambio de contraseña */}
        <div className="perfil-password">
          <h5>Cambiar Contraseña</h5>
          <form className="perfil-form mt-3">
            <div className="perfil-form-group">
              <label>Contraseña Actual:</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="perfil-form-group">
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="perfil-form-group">
              <label>Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="button" className="perfil-save-button mt-2" onClick={handleSavePassword}>
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
          <Footer />
    </>
  );
}

export default Perfil;
