import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CollaresContext } from "../context/CollaresProvider";

const Detalle = () => {
  const [collarDetail, setCollarDetail] = useState({});
  const { collares, addCarrito } = useContext(CollaresContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const obtenerDatos = () => {
    const datosCollar = collares.find((collar) => collar.id === id);

    setCollarDetail(datosCollar || {});
  };

  useEffect(() => {
    obtenerDatos();
  }, [collares]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3 estilos">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={collarDetail.img}
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
                  {collarDetail.ingredients?.map((ingredient, i) => (
                    <li key={i}>&#x1F9B4; {ingredient}</li>
                  ))}
                </ul>
                <div className="d-flex justify-content-around">
                  <h4>Precio: ${collarDetail.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      addCarrito(collarDetail.id,collarDetail.name,collarDetail.price,collarDetail.img);
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
