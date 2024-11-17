import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import "../index.css";

// Simulación de productos
const mockData = [
  {
    id: 1,
    name: "Collar Belanova",
    price: 15950,
    description: "Nylon resistente, ajustable",
    size: "M",
    color: "Rojo",
  },
  {
    id: 2,
    name: "Collar Winter",
    price: 12250,
    description: "Acolchado, resistente al agua",
    size: "L",
    color: "Azul",
  },
  {
    id: 3,
    name: "Collar Luna",
    price: 13990,
    description: "Cuero de alta calidad",
    size: "S",
    color: "Negro",
  },
  {
    id: 4,
    name: "Collar Titán",
    price: 12590,
    description: "Suave, con cristales",
    size: "XL",
    color: "Blanco",
  },
];

function AdminProducto() {
  const [products, setProducts] = useState(mockData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    size: "",
    color: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: "", price: "", description: "", size: "", color: "" });
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
      <Titulo titulo="Administrar Productos" />
      <div className="container admin_container">
        <div className="admin_product_form">
          <h5>{editMode ? "Editar Producto" : "Agregar Producto"}</h5>
          <div className="admin_form-row">
            {/* Primer columna: Nombre, Precio, Descripción */}
            <div className="admin_form-column">
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
            </div>

            {/* Segunda columna: Talla y Color */}
            <div className="admin_form-column">
              <input
                type="text"
                value={editMode ? editProduct.size : newProduct.size}
                onChange={(e) =>
                  editMode
                    ? setEditProduct({ ...editProduct, size: e.target.value })
                    : setNewProduct({ ...newProduct, size: e.target.value })
                }
                placeholder="Talla"
              />
              <input
                type="text"
                value={editMode ? editProduct.color : newProduct.color}
                onChange={(e) =>
                  editMode
                    ? setEditProduct({ ...editProduct, color: e.target.value })
                    : setNewProduct({ ...newProduct, color: e.target.value })
                }
                placeholder="Color"
              />
            </div>
          </div>
          <button onClick={editMode ? handleSaveEdit : handleAddProduct}>
            {editMode ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </div>

        <div className="admin_product_list mt-2">
          <h5>Lista de Productos</h5>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.size}</td>
                  <td>{product.color}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
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

export default AdminProducto;
