import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../utils/formatoNumero.js";

const Detalle = () => {
  const [collarDetail, setCollarDetail] = useState({});
  const { collares, addCarrito } = useContext(CollaresContext);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Buscar el producto que coincida con el ID
    const productoEncontrado = collares.find((collar) => collar.id === parseInt(id));
    setCollarDetail(productoEncontrado || {});
  }, [collares, id]);


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
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      addCarrito(collarDetail.id,collarDetail.name,collarDetail.price,collarDetail.imagen);
                      navigate(`/carrito`);}
                    }
                  >
                    Añadir &#128722;
                  </button>
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
