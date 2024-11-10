import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PizzasContext } from "../context/PizzaProvider";

const Detalle = () => {
  const [pizzaDetail, setPizzaDetail] = useState({});
  const { pizzas, addCarrito } = useContext(PizzasContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const obtenerDatos = () => {
    const datosPizza = pizzas.find((pizza) => pizza.id === id);

    setPizzaDetail(datosPizza || {});
  };

  useEffect(() => {
    obtenerDatos();
  }, [pizzas]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3 estilos">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={pizzaDetail.img}
                className="img-fluid estilos rounded-start"
                alt={pizzaDetail.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-capitalize">
                  {pizzaDetail.name}
                </h4>
                <hr />
                <p className="card-text">{pizzaDetail.desc}</p>
                <h6>Ingredientes:</h6>
                <ul>
                  {pizzaDetail.ingredients?.map((ingredient, i) => (
                    <li key={i}>&#127829; {ingredient}</li>
                  ))}
                </ul>
                <div className="d-flex justify-content-around">
                  <h3>Precio: ${pizzaDetail.price}</h3>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      addCarrito(pizzaDetail.id,pizzaDetail.name,pizzaDetail.price,pizzaDetail.img);
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
    </>
  );
};

export default Detalle;
