import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import "../index.css";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    address: "Calle Falsa 123",
    city: "Santiago",
    country: "Chile",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Sus datos han sido actualizados!");
    // Aquí puedes agregar la lógica para guardar los cambios
  };

  return (
    <>
      <Navbar />
      <Titulo titulo="Mi Perfil" />

      <div className="perfil-container mb-5">
        {/* <h2>Perfil de Usuario</h2> */}
        <form className="perfil-form">
          <div className="perfil-form-group">
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

          <button
            type="button"
            className="perfil-save-button"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
