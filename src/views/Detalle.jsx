import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../utils/formatoNumero.js";
import axios from "axios";
import { ENDPOINT } from "../utils/constants";

const Detalle = () => {
  const [collarDetail, setCollarDetail] = useState({});
  const [isFavorite, setIsFavorite] = useState(false); 
  const { collares, addCarrito, isLoggedIn } = useContext(CollaresContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const productoEncontrado = collares.find((collar) => collar.id === parseInt(id));
    setCollarDetail(productoEncontrado || {});

    // Verificar si el usuario está logueado antes de consultar favoritos
    if (isLoggedIn) {
      checkFavoriteStatus();
    }
  }, [collares, id, isLoggedIn]); // Agregar isLoggedIn a las dependencias del useEffect

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT.favorite}?producto_id=${id}`, // Pasar producto_id como parámetro de consulta
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Asumiendo que el backend devuelve un booleano indicando si es favorito
      setIsFavorite(response.data);
    } catch (error) {
      console.error("Error al verificar el estado de favorito:", error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isLoggedIn) { 
        const response = await axios.post(
          ENDPOINT.favorite, 
          { producto_id: id }, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setIsFavorite(!isFavorite); // Actualizar el estado
        console.log(response.data.message); 
      } else {
        navigate(`/login`); 
      }
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3 estilos">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={collarDetail.imagen}
                className="img-fluid estilos rounded-start"
                alt={collarDetail.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-capitalize">
                  {collarDetail.name}
                </h4>
                <hr />
                <p className="card-text">{collarDetail.desc}</p>
                <h6>Características:</h6>
                <ul>
                  <li>&#x1F9B4; Talla: {collarDetail.talla}</li>
                  <li>&#x1F9B4; Color: {collarDetail.color}</li>
                  <li>&#x1F9B4; Stock: {collarDetail.stock}</li>
                </ul>
                <div className="d-flex justify-content-around">
                  <h4>Precio: ${formatoNumero(collarDetail.price)}</h4>
                  <div className="admin_btn_favoritos">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        addCarrito(collarDetail.id,collarDetail.name,collarDetail.price,collarDetail.imagen);
                        navigate(`/carrito`);}
                      }
                    >
                      Añadir &#128722;
                    </button>
                    <button className="btn btn-info text-white" onClick={handleToggleFavorite}>
                      {isFavorite ? "Quitar de favoritos 🤍" : "Agregar a favoritos ❤️"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Detalle;