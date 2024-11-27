import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Titulo from "../components/Titulo";
import Footer from "../components/Footer";
import "../index.css";
import axios from "axios"; 
import { ENDPOINT } from "../utils/constants";

function AdminProducto() {
  const [products, setProducts] = useState([]); 
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    desc: "",
    talla: "",
    color: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT.products); 
        setProducts(response.data); 
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
  
    getProducts(); 
  }, []); 


  const handleAddProduct = async () => {
    try {
      await axios.post(ENDPOINT.products, newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // Actualizar el estado de productos con el nuevo producto
        setProducts([...products, response.data]); 
  
        // Ahora sí, limpiar el estado newProduct después de agregar el producto
        setNewProduct({ name: "", price: "", desc: "", talla: "", color: "" });

        window.alert("Producto creado 😀.");
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      window.alert("Error al agregar producto 🙁.");
    }
  };


  const handleSaveEdit = async () => {
    try {
      await axios.put(`${ENDPOINT.products}/${editProduct.id}`, editProduct, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const updatedProducts = products.map((product) =>
        product.id === editProduct.id ? editProduct : product
      );
      setProducts(updatedProducts);
      setEditMode(false);
      setEditProduct(null);
      window.alert("Producto modificado 😀.");
    } catch (error) {
      console.error("Error al editar producto:", error);
      window.alert("Error al editar producto 🙁.");
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct({ ...product }); // Copiar el producto para evitar mutaciones directas
    setEditMode(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${ENDPOINT.products}/${id}`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
      window.alert("Producto eliminado 😀.");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      window.alert("Error al eliminar producto 🙁.");
    }
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
                onChange={(e) => {
                  if (editMode) {
                    setEditProduct({ ...editProduct, name: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }
                }}
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
                value={editMode ? editProduct.desc : newProduct.desc}
                onChange={(e) =>
                  editMode
                    ? setEditProduct({
                        ...editProduct,
                        desc: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, desc: e.target.value })
                }
                placeholder="Descripción"
              />
            </div>

            {/* Segunda columna: Talla y Color */}
            <div className="admin_form-column">
              <input
                type="text"
                value={editMode ? editProduct.talla : newProduct.talla}
                onChange={(e) =>
                  editMode
                    ? setEditProduct({ ...editProduct, talla: e.target.value })
                    : setNewProduct({ ...newProduct, talla: e.target.value })
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
                <th className="w-25">Descripción</th>
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
                  <td>{product.desc}</td>
                  <td>{product.talla}</td>
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
