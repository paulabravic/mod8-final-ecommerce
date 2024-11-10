import { Route, Routes } from "react-router-dom";
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import { Carrito } from "./views/Carrito.jsx";

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="producto/">
          <Route path=":id" element={<Detalle />} />
        </Route>
        <Route path="carrito" element={<Carrito />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
};
export default App;