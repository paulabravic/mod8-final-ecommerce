import { Route, Routes } from "react-router-dom";
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import { Carrito } from "./views/Carrito.jsx";
import { Login } from "./views/Login.jsx";
import { Registro } from "./views/Registro.jsx";
import Admin from "./views/Admin.jsx";


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
        <Route path="admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
};
export default App;