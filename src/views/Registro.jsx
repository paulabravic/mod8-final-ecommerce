import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../index.css";

export const Registro = () => {
  const navigate = useNavigate();

  const handleClickRegistro = (e) => {
    e.preventDefault();
    alert("Usuario registrado exitosamente!");
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
            />

            <label className="registro_label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="registro_input"
            />

            <label className="registro_label" htmlFor="avatar">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              placeholder="URL del avatar"
              className="registro_input"
            />

            <div className="registro_buttonContainer">
              <button
                type="submit"
                className="registro_registerButton"
                onClick={handleClickRegistro}
              >
                Registrarme
              </button>
              {/* <button type="button" className="registro_backButton"
                      onClick={() => { navigate(`/login`); }}>
                Login
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
