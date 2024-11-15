import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../formatoNumero";

const Navbar = () => {
  const { total, isLoggedIn, setIsLoggedIn } = useContext(CollaresContext);
  const navigate = useNavigate();

  const handleClickCerrarSesion = (e) => {
    e.preventDefault(); 
    setIsLoggedIn(0);
    navigate(`/`);
  };

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0"><img src="/assets/Logos/logo_white.png" alt="Logo" width={32} /> Collares Bruno!</h4>
          </Link>

          {isLoggedIn > 0 ? (
            <div className="d-flex align-items-center">
              <Link to="/admin" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Administrar</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/" className="logo-nombre mx-1 mb-0" onClick={handleClickCerrarSesion}>
                <h6 className="mb-0 h6-menu">Cerrar sesión</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/carrito" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">
                  &#128722; Total ${formatoNumero(total)}
                </h6>
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <Link to="/login" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Iniciar Sesión</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/registro" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Registrarse</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/carrito" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">
                  &#128722; Total ${formatoNumero(total)}
                </h6>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
