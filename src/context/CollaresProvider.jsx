import { createContext, useEffect, useState } from "react";
import { ENDPOINT } from "../utils/constants";

export const CollaresContext = createContext();

const CollaresProvider = ({ children }) => {
  const [collares, setCollares] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  useEffect(() => {
    getCollares();
  }, []);

  const getCollares = async () => {
    try {
      const res = await fetch(ENDPOINT.products);
      const collaresRes = await res.json();
      setCollares(collaresRes);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };


  const addCarrito = (id, name, price, imagen) => {
    const producto = { id, name, price, imagen, count: 1 };
    const indiceCollares = carrito.findIndex((collar) => collar.id === id);
    if (indiceCollares >= 0) {
      carrito[indiceCollares].count++;
      setCarrito([...carrito]);
      calculateTotal([...carrito]);
    }
    else {
      setCarrito([...carrito, producto]);
      calculateTotal([...carrito, producto]);
    }
  }

  const subtractCarrito = (id) => {
    const indiceCollares = carrito.findIndex((collar) => collar.id === id);
    if (indiceCollares >= 0) {
      carrito[indiceCollares].count--;
      if (carrito[indiceCollares].count <= 0) {
        carrito.splice(indiceCollares, 1);
      }
      setCarrito([...carrito]);
    }
    calculateTotal([...carrito]);
  }

  const calculateTotal = (arrayCarrito) => {
    const totalCarrito = arrayCarrito.reduce((accumulator, collar) => {
      return accumulator + (collar.price * collar.count);
    }, 0);
    setTotal(totalCarrito);
  }


  return (
    <CollaresContext.Provider value={{ collares, setCollares, carrito, setCarrito, total, setTotal, addCarrito, subtractCarrito, isLoggedIn, setIsLoggedIn }}>
      {children}
    </CollaresContext.Provider>
  );
};

export default CollaresProvider;