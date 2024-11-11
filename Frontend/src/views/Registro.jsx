import React from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const Registro = () => {

  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Registrarse</h1>
        <form style={styles.form}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            style={styles.input}
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            style={styles.input}
          />

          <label style={styles.label} htmlFor="avatar">Avatar URL</label>
          <input
            type="text"
            id="avatar"
            placeholder="URL del avatar"
            style={styles.input}
          />

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.registerButton}>Registrarme</button>
            <button type="button" style={styles.backButton}
                onClick={() => {navigate(`/login`);}}>
                Login</button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    backgroundColor: '#fff', // color de fondo verde
    marginTop: '80px',
  },
  formContainer: {
    backgroundColor: '#1E7D3A',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    textAlign: 'left',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  registerButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#F0A500', // botón amarillo
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ddd', // botón gris para volver
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

