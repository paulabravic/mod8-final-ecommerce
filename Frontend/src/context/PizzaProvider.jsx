import { createContext, useEffect, useState } from "react";

export const PizzasContext = createContext();

const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = async () => {
    const res = await fetch("pizzas.json");
    const pizzas = await res.json();
    setPizzas(pizzas);
  };

  const addCarrito = (id, name, price, img) => {
    const producto = { id, name, price, img, count: 1 };
    const indicePizzas = carrito.findIndex((pizza) => pizza.id === id);
    if (indicePizzas >= 0) {
      carrito[indicePizzas].count++;
      setCarrito([...carrito]);
      calculateTotal([...carrito]);
    }
    else {
      setCarrito([...carrito, producto]);
      calculateTotal([...carrito, producto]);
    }
  }

  const subtractCarrito = (id) => {
    const indicePizzas = carrito.findIndex((pizza) => pizza.id === id);
    if (indicePizzas >= 0) {
      carrito[indicePizzas].count--;
      if (carrito[indicePizzas].count <= 0) {
        carrito.splice(indicePizzas, 1);
      }
      setCarrito([...carrito]);
    }
    calculateTotal([...carrito]);
  }

  const calculateTotal = (arrayCarrito) => {
    const totalCarrito = arrayCarrito.reduce((accumulator, pizza) => {
      return accumulator + (pizza.price * pizza.count);
    }, 0);
    setTotal(totalCarrito);
  }


  return (
    <PizzasContext.Provider value={{ pizzas, setPizzas, carrito, setCarrito, total, setTotal, addCarrito, subtractCarrito }}>
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;