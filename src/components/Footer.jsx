import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-white py-4 footer">
      <div className="container">
        <div className="row justify-content-between">
          {/* Atención al Cliente */}
          <div className="col-md-3 text-start">
            <h5>
              <strong>Atención al Cliente</strong>
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/faq" className="text-white">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/ayuda" className="text-white">
                  Centro de Ayuda
                </Link>
              </li>
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
