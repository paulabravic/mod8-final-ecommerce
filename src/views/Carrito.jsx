import React, { useContext } from "react";
import { CollaresContext } from "../context/CollaresProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { formatoNumero } from "../utils/formatoNumero";

export const Carrito = () => {
  const { carrito, total, addCarrito, subtractCarrito, isLoggedIn } =
    useContext(CollaresContext);
    const navigate = useNavigate();

    const handlePagar = () => {
      if (carrito.length === 0) {
        window.alert("No tienes productos en el carrito, anímate, elige uno 😀.");
      } else {
        // Verificar si el usuario ha iniciado sesión
        if (isLoggedIn) { 
          navigate(`/pago`); 
        } else {
          navigate(`/login`); 
        }
      }
    };

  return (
    <>
      <Navbar />
      <div className="container mt-5 div-carrito d-flex flex-column min-vh-100">
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
                      addCarrito(cart.id, cart.name, cart.price, cart.img)
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
          <button
            className="btn btn-success"
            onClick={handlePagar}
          >
            Ir a Pagar
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
