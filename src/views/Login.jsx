import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../utils/constants"; 
import axios from "axios";
import "../index.css";
import { CollaresContext } from "../context/CollaresProvider"; 
import jwt_decode from 'jwt-decode';

export const Login = () => {
  const { setIsLoggedIn } = useContext(CollaresContext); // Accede al estado del contexto
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const modelLogin = { email: "", password: "" };

  const handleClickLogin = async (e) => {
    e.preventDefault();

    modelLogin.email = email.value.trim();
    modelLogin.password = password.value.trim();

    if (!modelLogin.email.trim() || !modelLogin.password.trim()) {
      return window.alert("Email y password obligatorios.");
    }

    if (!emailRegex.test(modelLogin.email)) {
      return window.alert("El formato del email no es correcto!");
    }

    try {
      // Realiza la petición al backend para el login
      const response = await axios.post(ENDPOINT.login, modelLogin); 

      // Guarda el token en el almacenamiento local
      localStorage.setItem('token', response.data.token); 

      // Decodifica el token JWT
      const decodedToken = jwt_decode(response.data.token);

      // Almacena la información del usuario en el localStorage
      localStorage.setItem('userData', JSON.stringify(decodedToken));

      window.alert("Usuario identificado con éxito 😀.");

      // Determina el tipo de usuario basado en el rol decodificado
      if (decodedToken.rol === 'administrador') {
        setIsLoggedIn(1); // Usuario Admin
        navigate(`/admin-producto`);
      } else {
        setIsLoggedIn(2); // Usuario normal
        navigate(`/`); 
      }
    } catch (error) {
      console.error(error);
      window.alert("Error en el inicio de sesión 🙁.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login_container">
        <div className="login_formContainer">
          <h1 className="login_title">Iniciar sesión</h1>
          <form className="login_form">
            <label className="login_label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="login_input"
            />

            <label className="login_label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="login_input"
            />

            <div className="login_buttonContainer">
              <button
                type="submit"
                className="login_loginButton"
                onClick={handleClickLogin}
              >
                Iniciar Sesión
              </button>

              <a href="/recuperar-pass" className="pt-2 text-white">
                Recuperar contraseña
              </a>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
