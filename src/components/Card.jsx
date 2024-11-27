import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../utils/formatoNumero.js";

const Card = () => {
  const { collares, addCarrito } = useContext(CollaresContext);

  const navigate = useNavigate();

  return (
    <>
      {collares.map((collar) => (
        <div key={collar.id} className="col">
          <div className="card card-height-minimo">
            <img className="card-img-top" src={collar.img} alt="" width={260} height={180} />
            <div className="card-body">
              <h4 className="card-title text-capitalize card-nowrap-h4">Collar {collar.name}</h4>
              <hr />
              <p className="card-text">
                <b>Características:</b>
              </p>

              <ul>
                <li className="card-nowrap-li">&#x1F9B4; Talla: {collar.talla}</li>
                <li className="card-nowrap-li">&#x1F9B4; Color: {collar.color}</li>
                <li className="card-nowrap-li">&#x1F9B4; Stock: {collar.stock}</li> 
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

              <button className="btn btn-danger" onClick={() => {
                addCarrito(collar.id, collar.name, collar.price, collar.img,true);
                navigate(`/carrito`);
              }} >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
