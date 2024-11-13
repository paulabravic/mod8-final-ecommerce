import React from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import '../index.css'; 

export const Login = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="login_container">
        <div className="login_formContainer">
          <h1 className="login_title">Iniciar sesión</h1>
          <form className="login_form">
            <label className="login_label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="login_input"
            />

            <label className="login_label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="login_input"
            />

            <div className="login_buttonContainer">
              <button type="submit" className="login_loginButton">Iniciar Sesión</button>
              <button type="button" className="login_backButton" 
                      onClick={() => { navigate(`/registro`); }}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
