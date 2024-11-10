import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../formatoNumero.js";

const Card = () => {
  const { collares, addCarrito } = useContext(CollaresContext);

  const navigate = useNavigate();

  return (
    <>
      {collares.map((collar) => (
        <div key={collar.id} className="col">
          <div className="card">
            <img className="card-img-top" src={collar.img} alt="" />
            <div className="card-body">
              <h4 className="card-title text-capitalize">Collar {collar.name}</h4>
              <hr />
              <p className="card-text">
                <b>Ingredientes:</b>
              </p>

              <ul>
                {collar.ingredients.map((ingredient, i) => (
                  <li key={i}>&#127829; {ingredient}</li>
                ))}
              </ul>
            </div>
            
            <hr />

            <h2 className="text-center text-dark pb-3">
              Precio: ${formatoNumero(collar.price)}
            </h2>

            <div className="d-flex justify-content-around mb-4">
              <button
                to={`collar/${collar.id}`}
                className="btn btn-info text-white"
                onClick={() => navigate(`/producto/${collar.id}`)}
              >
                Ver Más &#128064;
              </button>

              <button className="btn btn-danger" onClick={() => {
                addCarrito(collar.id, collar.name, collar.price, collar.img,true);
                navigate(`/carrito`);
              }} >
                Añadir &#128722;
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
