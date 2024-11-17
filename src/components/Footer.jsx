import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" footer text-white py-4 mt-auto">
      <div className="container">
        <div className="row justify-content-between">
          {/* Atención al Cliente */}
          <div className="col-md-3 text-start">
            <h5>
              <strong>Atención al Cliente</strong>
            </h5>
            <ul className="list-unstyled">
              <li>
                <strong>Teléfono:</strong>
              </li>
              <li>+56 2 2225 5555 </li>
            </ul>
          </div>

          {/* Dirección */}
          <div className="col-md-3 text-start">
            <h5>
              <strong>Localiza a Bruno</strong>
            </h5>
            <ul className="list-unstyled">
              <li>Chile</li>
              <li>
                <strong>Horario:</strong>
              </li>
              <li>Lunes a Viernes: 09:00 a 18:00 hrs</li>
            </ul>
          </div>

          {/* Habla con nosotros */}
          <div className="col-md-3 text-start">
            <h5>
              <strong>Habla con nosotros</strong>
            </h5>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong>
              </li>
              <li>info@bruno.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
