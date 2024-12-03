import React, { useState, useContext } from "react";
import { CollaresContext } from "../context/CollaresProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { formatoNumero } from "../utils/formatoNumero";
import axios from "axios";
import { ENDPOINT } from "../utils/constants"; 

export const Pago = () => {
  const { carrito, total, addCarrito, subtractCarrito, setCarrito, setTotal } = useContext(CollaresContext);
  const [metodoPago, setMetodoPago] = useState("debito");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [ccv, setCcv] = useState("");
  const [direccion, setDireccion] = useState("Calle Alameda 123, Santiago, Chile");
  const navigate = useNavigate();

  const handlePago = async () => {

    if(carrito.length === 0){
      window.alert("No tienes productos en el carrito, anímate, elige uno 😀.");
      return;
    }

    // Validaciones del formulario
    if (!numeroTarjeta || !vencimiento || !ccv) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    // Validación del número de tarjeta (ejemplo simple)
    if (numeroTarjeta.length < 5 || isNaN(numeroTarjeta)) {
      alert("Número de tarjeta inválido.");
      return;
    }

    // Validación de la fecha de vencimiento (ejemplo simple)
    const [mes, anio] = vencimiento.split("/");
    if (
      mes < 1 ||
      mes > 12 ||
      anio.length !== 2 ||
      isNaN(anio)
    ) {
      alert("Fecha de vencimiento inválida.");
      return;
    }

    // Validación del CCV (ejemplo simple)
    if (ccv.length < 3 || ccv.length > 4 || isNaN(ccv)) {
      alert("CCV inválido.");
      return;
    }

    try {
      const datosPago = {
        metodoPago,
        numeroTarjeta,
        vencimiento,
        ccv,
        direccion,
        total,
        carrito, // Agrega el carrito al payload
      };

      await axios.post(ENDPOINT.pago, datosPago, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("¡Pago realizado con éxito! 😀");
          setCarrito([]); // Limpiar el carrito
          setTotal(0); // Actualizar el total
          navigate("/"); 
        } else {
          alert("Error al procesar el pago.");
        }
      });
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex flex-column min-vh-100">
        <div className="row">
          {/* Productos en el carrito */}
          <div className="col-lg-8">
            <h3>Detalles del pedido:</h3>
            <div className="div-carrito-interno">
              {carrito.map((cart) => (
                <div key={cart.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="div-carrito-collar">
                      <img
                        src={cart.imagen}
                        alt={cart.name}
                        className="img-collar-mini"
                      />
                      <span className="text-capitalize">{cart.name}</span>
                    </div>
                    <div className="div-carrito-precio">
                      <span className="fw-bold text-success">
                        ${formatoNumero(cart.price * cart.count)}
                      </span>
                      <button
                        className="btn btn-danger"
                        onClick={() => subtractCarrito(cart.id)}
                      >
                        -
                      </button>
                      <span className="fw-bold">{cart.count}</span>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          addCarrito(cart.id, cart.name, cart.price, cart.imagen)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}

              {carrito.length === 0 ? (
                <h4 className="text-danger text-center">
                  No hay productos en el carrito
                </h4>
              ) : null}

              <h4 className="fw-bold py-3">Total ${formatoNumero(total)}</h4>
            </div>
          </div>

          {/* Formulario de pago con recuadro */}
          <div className="col-lg-4">
            <div className="p-4 border rounded shadow-sm bg-white">
              <h3>Detalles del Pago</h3>
              <div className="div-pago">
                <div className="mb-3">
                  <label className="form-label">Dirección de Envío</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    readOnly
                    disabled
                  />
                </div>

                <h4 className="fw-bold py-3">Total a Pagar: ${formatoNumero(total)}</h4>

                <div className="mb-3">
                  <label className="form-label">Método de Pago</label>
                  <select
                    className="form-select"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="debito">Débito</option>
                    <option value="credito">Crédito</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                    placeholder="Ingrese el número de tarjeta"
                  />
                </div>

                <div className="d-flex">
                  <div className="mb-3 w-50 pe-2">
                    <label className="form-label">Fecha de Vencimiento</label>
                    <input
                      type="text"
                      className="form-control"
                      value={vencimiento}
                      onChange={(e) => setVencimiento(e.target.value)}
                      placeholder="MM/AA"
                    />
                  </div>

                  <div className="mb-3 w-50 ps-2">
                    <label className="form-label">Código CCV</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ccv}
                      onChange={(e) => setCcv(e.target.value)}
                      placeholder="Código CCV"
                    />
                  </div>
                </div>

                <button
                  className="btn btn-success mt-4"
                  onClick={handlePago}
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
