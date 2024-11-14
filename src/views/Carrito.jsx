import React, { useContext } from "react";
import { CollaresContext } from "../context/CollaresProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatoNumero } from "../formatoNumero";

export const Carrito = () => {
  const { carrito, total, addCarrito, subtractCarrito } =
    useContext(CollaresContext);

  return (
    <>
      <Navbar />
      <div className="container mt-5 div-carrito">
        <h3>Detalles del pedido:</h3>
        <div className="div-carrito-interno">
          {carrito.map((cart) => (
            <div key={cart.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="div-carrito-collar">
                  <img
                    src={cart.img}
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
            onClick={() => alert("¡Gracias por preferirnos! :)")}
          >
            Ir a Pagar
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
