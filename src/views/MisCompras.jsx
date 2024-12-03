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
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de la API

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const response = await axios.get(ENDPOINT.pago, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (Array.isArray(response.data)) {
          setCompras(response.data);
        } else if (response.data.message) {
          setMensaje(response.data.message);
        }
      } catch (error) {
        console.error("Error al obtener las compras:", error);
        setMensaje("Ocurrió un error al cargar tus compras."); // Mensaje en caso de error
      }
    };
    obtenerCompras();
  }, []);

  return (
    <>
      <Navbar /> 
      <Titulo titulo="Mis Compras" />
      <div className="container mis-compras-container mt-5">
        <div className="mis-compras-list">
          {/* Si hay un mensaje, mostrarlo */}
          {mensaje ? (
            <p>{mensaje}</p>
          ) : (
            compras.length > 0 ? (
              compras.map((compra) => (
                <div key={compra.pago_id} className="mis-compras-pedido border border-1 border-secondary">
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
              ))
            ) : (
              <p>No hay compras registradas.</p>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MisCompras;
