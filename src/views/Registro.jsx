import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../index.css";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleClickRegistro = (e) => {
    e.preventDefault();
    setError("");

    // Validación de campos vacíos y contraseña
    if (!email || !password || !nombres) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("El formato del email no es correcto!");
      return;
    }


    // Obtener los usuarios almacenados en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Validar si el email ya existe
    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
    if (usuarioExistente) {
      setError("El email ya está registrado.");
      return;
    }

    // Guardar el nuevo usuario en el array
    const nuevoUsuario = { email, password, nombres };
    usuarios.push(nuevoUsuario);

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado exitosamente! 😀");
    navigate(`/login`);
  };

  return (
    <>
      <Navbar />
      <div className="registro_container">
        <div className="registro_formContainer">
          <h1 className="registro_title">Registrarse</h1>
          <form className="registro_form">
            <label className="registro_label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="registro_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="registro_label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="registro_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="registro_label" htmlFor="nombres">
              Nombres
            </label>
            <input
              type="text"
              id="nombres"
              placeholder="Nombres"
              className="registro_input"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />

            {error && <p className="registro_error">{error}</p>}

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
