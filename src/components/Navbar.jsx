import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CollaresContext } from "../context/CollaresProvider";
import { formatoNumero } from "../utils/formatoNumero";

const Navbar = () => {
  const { total, isLoggedIn, setIsLoggedIn, setCarrito, setTotal } = useContext(CollaresContext);
  const navigate = useNavigate();

  const handleClickCerrarSesion = (e) => {
    e.preventDefault(); 
    setCarrito([]); // Limpiar el carrito
    setTotal(0); // Actualizar el total
    localStorage.removeItem('token'); // Eliminar token del localStorage
    localStorage.removeItem('userData');
    setIsLoggedIn(0);
    window.alert("Gracias por visitarnos, vuelve pronto!");
    navigate(`/`);
  };

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0"><img src="/assets/Logos/logo_white.png" alt="Logo" width={32} /> Collares Bruno!</h4>
          </Link>

          {isLoggedIn === 1 ? (
            <div className="d-flex align-items-center">
              <Link to="/admin-pedido" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Administrar Pedidos</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/admin-producto" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Administrar Productos</h6>
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
          ) : isLoggedIn === 2 ? (
            <div className="d-flex align-items-center">
              <Link to="/perfil" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Mi Perfil</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/mis-compras" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Mis Compras</h6>
              </Link>

              <h6 className="mb-0 h6-menu">|</h6>

              <Link to="/favorito" className="logo-nombre mx-1 mb-0">
                <h6 className="mb-0 h6-menu">Favoritos</h6>
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
                <h6 className="mb-0 h6-menu preview-carrito-total">
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
