import { Route, Routes } from "react-router-dom";
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import { Carrito } from "./views/Carrito.jsx";
import { Login } from "./views/Login.jsx";
import { Registro } from "./views/Registro.jsx";
import Favorito from "./views/Favorito.jsx";
import MisCompras from "./views/MisCompras.jsx";
import AdminProducto from "./views/AdminProducto.jsx";
import AdminPedido from "./views/AdminPedido.jsx";

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="producto/">
          <Route path=":id" element={<Detalle />} />
        </Route>
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="admin-producto" element={<AdminProducto />} />
        <Route path="admin-pedido" element={<AdminPedido />} />        
        <Route path="favorito" element={<Favorito />} />
        <Route path="mis-compras" element={<MisCompras />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
};
export default App;