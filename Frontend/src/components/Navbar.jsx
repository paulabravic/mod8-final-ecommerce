import { useContext } from "react";
import { Link } from "react-router-dom";
import { PizzasContext } from "../context/PizzaProvider";
import { formatoNumero } from "../formatoNumero";

const Navbar = () => {

  const { total } = useContext(PizzasContext);

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#128021; Collares Bruno!</h4>
          </Link>

          <Link to="/carrito" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#128722; Total ${formatoNumero(total)}</h4>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
