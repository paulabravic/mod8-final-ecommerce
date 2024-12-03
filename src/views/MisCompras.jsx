import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import { formatoNumero } from "../utils/formatoNumero";
import { ENDPOINT } from "../utils/constants"; 
import "../index.css";
import axios from "axios";

function MisCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const response = await axios.get(ENDPOINT.pago, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setCompras(response.data);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      }
    };
    obtenerCompras();
  }, []);

  return (
    <>
      <Navbar /> 
      <Titulo titulo="Mis Compras" />
      <div className="container mis-compras-container mt-5">
        <h1>Mis Compras</h1>
        <div className="mis-compras-list">
          {compras.map((compra) => (
            <div key={compra.pago_id} className="mis-compras-pedido">
              <div className="mis-compras-pedido-header">
                <h5 className="mis-compras-pedido-id">Pedido ID: {compra.pedido_id}</h5>
                <p><span className="fw-bold">Fecha del Pago:</span> {compra.fecha_pago}</p>
                <p><span className="fw-bold">Estado del Pago:</span> {compra.estado_pago}</p>
                <p className="mis-compras-pedido-total">Total del Pago: ${formatoNumero(compra.total_pago)}</p>
              </div>
              <h6>Productos:</h6>
              <div className="mis-compras-productos">
                {compra.productos.map((producto) => (
                  <div key={producto.producto_id} className="mis-compras-producto">
                    <span className="mis-compras-producto-nombre">{producto.nombre}</span>
                    <span className="mis-compras-producto-cantidad">Cantidad: {producto.cantidad}</span>
                    <span className="mis-compras-producto-precio">Precio unitario: ${formatoNumero(producto.precio)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MisCompras;