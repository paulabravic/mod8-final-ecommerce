// AdminView.jsx
import React, { useState, useEffect } from "react";
import "../index.css";
import Navbar from "../components/Navbar";

// Simulación de productos
const mockData = [
  {
    id: 1,
    name: "Collar Belanova",
    price: 15950,
    description: "Nylon resistente, ajustable",
  },
  {
    id: 2,
    name: "Collar Winter",
    price: 12250,
    description: "Acolchado, resistente al agua",
  },
  {
    id: 3,
    name: "Collar Luna",
    price: 13990,
    description: "Cuero de alta calidad",
  },
  {
    id: 4,
    name: "Collar Titán",
    price: 12590,
    description: "Suave, con cristales",
  },
];

function Admin() {
  const [products, setProducts] = useState(mockData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: "", price: "", description: "" });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );
    setProducts(updatedProducts);
    setEditMode(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="container admin_container">
        <h1>Administrar Productos</h1>
        <div className="admin_product_form">
          <h3>{editMode ? "Editar Producto" : "Agregar Producto"}</h3>
          <input
            type="text"
            value={editMode ? editProduct.name : newProduct.name}
            onChange={(e) =>
              editMode
                ? setEditProduct({ ...editProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Nombre del producto"
          />
          <input
            type="number"
            value={editMode ? editProduct.price : newProduct.price}
            onChange={(e) =>
              editMode
                ? setEditProduct({ ...editProduct, price: e.target.value })
                : setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Precio"
          />
          <input
            type="text"
            value={editMode ? editProduct.description : newProduct.description}
            onChange={(e) =>
              editMode
                ? setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Descripción"
          />
          <button onClick={editMode ? handleSaveEdit : handleAddProduct}>
            {editMode ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </div>

        <div className="admin_product_list">
          <h3>Lista de Productos</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      Eliminar
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

export default Admin;
