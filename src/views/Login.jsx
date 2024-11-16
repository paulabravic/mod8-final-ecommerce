import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CollaresContext } from "../context/CollaresProvider";
import "../index.css";

//setIsLoggedIn

export const Login = () => {
  const { setIsLoggedIn } = useContext(CollaresContext);
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const modelLogin = { email: "", password: "" };

  const handleClickLogin = (e) => {
    e.preventDefault();

    modelLogin.email = email.value.trim();
    modelLogin.password = password.value.trim();

    if (!modelLogin.email.trim() || !modelLogin.password.trim()) {
      return window.alert("Email y password obligatorios.");
    }

    if (!emailRegex.test(modelLogin.email)) {
      return window.alert("El formato del email no es correcto!");
    }

    //Data de prueba mientras se integra a backend

    if (
      modelLogin.email == "admin@bruno.cl" &&
      modelLogin.password == "Admin9876*"
    ) {
      //window.sessionStorage.setItem('token', data.token)
      window.alert("Usuario identificado con éxito 😀.");
      setIsLoggedIn(1);
      navigate(`/`);

      // axios
      //   .post(ENDPOINT.login, modelLogin)
      //   .then(({ data }) => {
      //     //window.sessionStorage.setItem('token', data.token)
      //     window.alert("Usuario identificado con éxito 😀.");
      //     setIsLoggedIn(1);
      //     navigate(`/`);
      //   })
      //   .catch(({ response: { data } }) => {
      //     console.error(data);
      //     window.alert(`${data.message} 🙁.`);
      //   });
    } else {
      // Obtener los usuarios almacenados en localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      // Validar si existe en localStorage
      const usuarioExistente = usuarios.find(
        (usuario) =>
          usuario.email === modelLogin.email &&
          usuario.password === modelLogin.password
      );
      if (usuarioExistente) {
        //window.sessionStorage.setItem('token', data.token)
        window.alert("Usuario identificado con éxito 😀.");
        setIsLoggedIn(1);
        navigate(`/`);
      } else {
        window.alert(`No existe usuario con el email y password ingresado 🙁.`);
      }
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
              {/* <button type="button" className="login_backButton" 
                      onClick={() => { navigate(`/registro`); }}>
                Registrarse
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
