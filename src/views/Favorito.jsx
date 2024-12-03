import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Titulo from "../components/Titulo";
import axios from "axios";
import { ENDPOINT } from "../utils/constants";
import { formatoNumero } from "../utils/formatoNumero.js";
import { CollaresContext } from "../context/CollaresProvider";

const Favorito = () => {
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const { addCarrito } = useContext(CollaresContext);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  const obtenerFavoritos = async () => {
    try {
      const response = await axios.get(ENDPOINT.favorite, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProductosFavoritos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos favoritos:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Titulo titulo="Mis Favoritos" />
      <div className="container my-5">
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {productosFavoritos.length > 0 ? (
              productosFavoritos.map((collar) => (
                <div key={collar.id} className="col">
                  <div className="card card-height-minimo">
                    <img
                      className="card-img-top"
                      src={collar.imagen}
                      alt=""
                      width={260}
                      height={180}
                    />
                    <div className="card-body">
                      <h4 className="card-title text-capitalize card-nowrap-h4">
                        Collar {collar.name}
                      </h4>
                      <hr />
                      <p className="card-text">
                        <b>Características:</b>
                      </p>

                      <ul>
                        <li className="card-nowrap-li">
                          &#x1F9B4; Talla: {collar.talla}
                        </li>
                        <li className="card-nowrap-li">
                          &#x1F9B4; Color: {collar.color}
                        </li>
                        <li className="card-nowrap-li">
                          &#x1F9B4; Stock: {collar.stock}
                        </li>
                      </ul>
                    </div>

                    <hr />

                    <h4 className="text-center text-dark pb-3">
                      Precio: ${formatoNumero(collar.price)}
                    </h4>

                    <div className="d-flex justify-content-around mb-4">
                      <button
                        to={`collar/${collar.id}`}
                        className="btn btn-info text-white"
                        onClick={() => navigate(`/producto/${collar.id}`)}
                      >
                        Ver Más
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          addCarrito(
                            collar.id,
                            collar.name,
                            collar.price,
                            collar.imagen,
                            true
                          );
                          navigate(`/carrito`);
                        }}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">
                No tienes productos en favoritos.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorito;
