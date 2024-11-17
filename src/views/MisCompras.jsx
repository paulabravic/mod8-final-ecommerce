import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import { formatoNumero } from "../utils/formatoNumero";
import "../index.css";

// Simulación de compras (mock data)
const mockCompras = [
  {
    id: 1,
    cliente: "Juan Pérez",
    fechaPago: "11/11/2024",
    estado: "Pagado",
    productos: [
      {
        id: "P001",
        nombre: "Belanova",
        cantidad: 1,
        precio: 15950,
      },
      {
        id: "P002",
        nombre: "Winter",
        cantidad: 2,
        precio: 12250,
      },
    ],
  },
  {
    id: 2,
    cliente: "Ana Gómez",
    fechaPago: "12/11/2024",
    estado: "Enviado",
    productos: [
      {
        id: "P003",
        nombre: "Luna",
        cantidad: 1,
        precio: 13990,
      },
      {
        id: "P004",
        nombre: "Titán",
        cantidad: 3,
        precio: 12590,
      },
    ],
  },
  {
    id: 3,
    cliente: "Carlos Díaz",
    fechaPago: "13/11/2024",
    estado: "Pendiente",
    productos: [
      {
        id: "P005",
        nombre: "Golden",
        cantidad: 1,
        precio: 16450,
      },
      {
        id: "P006",
        nombre: "Simba",
        cantidad: 1,
        precio: 15500,
      },
    ],
  },
];

function MisCompras() {
  const [compras, setCompras] = useState(mockCompras);

  return (
    <>
      <Navbar />
      <Titulo titulo="Mis Compras" />
      <div className="container mis-compras-container mt-3">
        <div className="mis-compras-list mt-2">
          <h5>Lista de Compras</h5>
          <div className="mis-compras-table">
            {compras.map((compra) => (
              <div className="mis-compras-pedido" key={compra.id}>
                <div className="mis-compras-pedido-header">
                  <span className="mis-compras-pedido-id">Pedido ID: {compra.id}</span>
                  <span className="mis-compras-pedido-fechaPago">Fecha de Pago: {compra.fechaPago}</span>
                  <span className="mis-compras-pedido-estado">Estado: {compra.estado}</span>
                </div>
                <div className="mis-compras-productos">
                  {compra.productos.map((producto) => (
                    <div className="mis-compras-producto" key={producto.id}>
                      <span className="mis-compras-producto-nombre">{producto.nombre}</span>
                      <span className="mis-compras-producto-cantidad">Cantidad: {producto.cantidad}</span>
                      <span className="mis-compras-producto-precio">
                        Precio: ${formatoNumero(producto.precio * producto.cantidad)} 
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MisCompras;
