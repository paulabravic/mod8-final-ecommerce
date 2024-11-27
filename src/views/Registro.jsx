import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../utils/constants";
import axios from "axios";
import "../index.css";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [address, setAddress] = useState("");  
  const [city, setCity] = useState("");        
  const [country, setCountry] = useState("Chile"); // Estado con valor predeterminado
  const [error, setError] = useState("");
  const [errorAnim, setErrorAnim] = useState(false); 
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleClickRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setErrorAnim(false);

    // Validación de campos vacíos y contraseña
    if (!email || !password || !nombres || !address || !city || !country) {
      setError("Todos los campos son obligatorios.");
      setErrorAnim(true);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setErrorAnim(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("El formato del email no es correcto!");
      setErrorAnim(true);
      return;
    }

    // Construir el objeto con los datos del usuario
    const nuevoUsuario = { 
      nombre: nombres,
      email: email,
      password: password,
      direccion: address,
      ciudad: city,
      pais: country
    };

    try {
      // Enviar la solicitud POST al backend
      const response = await axios.post(ENDPOINT.users, nuevoUsuario); 
      console.log("Respuesta del servidor:", response.data);
      alert("Usuario registrado exitosamente! 😀");
      navigate(`/login`);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(`Error al registrar: ${error.response.data.message}`); 
    }

  };

  return (
    <>
      <Navbar />
      <div className="registro_container mt-4">
        <div className="registro_formContainer">
          <h1 className="registro_title">Registrarse</h1>
          <form className="registro_form">
            <label className="registro_label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="registro_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="registro_label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="registro_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="registro_label" htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              placeholder="Nombres"
              className="registro_input"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />

            {/* Nuevo campo: Dirección */}
            <label className="registro_label" htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              placeholder="Dirección"
              className="registro_input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* Nuevo campo: Ciudad */}
            <label className="registro_label" htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              placeholder="Ciudad"
              className="registro_input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* Nuevo campo: País */}
            <label className="registro_label" htmlFor="country">País</label>
            <select
              id="country"
              className="registro_input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="Chile">Chile</option>
              <option value="Perú">Perú</option>
              <option value="Argentina">Argentina</option>
            </select>

            {error && (
              <p className={`registro_error ${errorAnim ? "error-anim" : ""}`}>
                {error}
              </p>
            )}

            <div className="registro_buttonContainer">
              <button
                type="submit"
                className="registro_registerButton"
                onClick={handleClickRegistro}
              >
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
