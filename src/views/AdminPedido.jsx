import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import "../index.css";

// Simulación de pedidos
const mockPedidos = [
  {
    id: 1,
    cliente: "Juan Pérez",
    fecha: "2024-11-10",
    estado: "Pendiente",
  },
  {
    id: 2,
    cliente: "Ana Gómez",
    fecha: "2024-11-11",
    estado: "Enviado",
  },
  {
    id: 3,
    cliente: "Carlos Díaz",
    fecha: "2024-11-12",
    estado: "Pendiente",
  },
];

function AdminPedido() {
  const [pedidos, setPedidos] = useState(mockPedidos);
  const [editPedido, setEditPedido] = useState(null);

  const handleEditEstado = (id, nuevoEstado) => {
    const updatedPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );
    setPedidos(updatedPedidos);
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
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <select
                      value={pedido.estado}
                      onChange={(e) =>
                        handleEditEstado(pedido.id, e.target.value)
                      }
                      className="admin-pedido-select"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleEditEstado(pedido.id)}>
                      Guardar Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminPedido;
