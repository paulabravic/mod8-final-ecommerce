import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import { ENDPOINT } from "../utils/constants"; 
import "../index.css";
import axios from "axios"; 

function AdminPedido() {
  const [pedidos, setPedidos] = useState([]);
  const selectRefs = useRef({}); // Referencias para los elementos select

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await axios.get(ENDPOINT.pago, { // Ajusta la ruta si es necesario
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de pedidos:", error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    };
    obtenerPedidos();
  }, []);

  const handleEditEstado = async (id) => {
    // Obtener el nuevo estado del select correspondiente al ID del pedido
    const nuevoEstado = selectRefs.current[id].value;

    try {
      await axios.put(
        `${ENDPOINT.pago}/${id}`,
        { estado: nuevoEstado },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Actualizar el estado local
      const pedidosActualizados = pedidos.map((pedido) =>
        pedido.pago_id === id ? { ...pedido, estado: nuevoEstado } : pedido
      );
      setPedidos(pedidosActualizados);
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      // Manejo de errores
    }
  };

  const handleSelectChange = (id, nuevoEstado) => {
    const pedidosActualizados = pedidos.map((pedido) =>
      pedido.pago_id === id ? { ...pedido, estado_pago: nuevoEstado } : pedido
    );
    setPedidos(pedidosActualizados);
  };

  return (
    <>
      <Navbar />
      <Titulo titulo="Administrar Pedidos" />
      <div className="container admin-pedido-container">
        <div className="admin-pedido-list mt-2">
          <h5>Lista de Pedidos</h5>
          <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pago_id}>
                <td>{pedido.pago_id}</td>
                <td>{pedido.fecha_pago}</td> 
                <td>
                  <select
                    id="estado_pago"
                    name="estado_pago"
                    value={pedido.estado_pago}
                    ref={(ref) => (selectRefs.current[pedido.pago_id] = ref)} 
                    onChange={(e) => handleSelectChange(pedido.pago_id, e.target.value)}
                    className="admin-pedido-select"
                  >
                    <option value="completado">Completado</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditEstado(pedido.pago_id)} 
                  >
                    Guardar Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminPedido;