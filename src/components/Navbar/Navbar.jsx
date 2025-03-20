import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Navbar.module.scss'; 

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-none fixed-top">
      <div className="container-fluid d-flex justify-content-center">
        <button
          className={`btn ${activeTab === "cadastro" ? styles['active-btn'] : styles['btn-outline-primary']}`}
          onClick={() => setActiveTab("cadastro")}
        >
          Novo Cadastro
        </button>
        <button
          className={`btn ms-3 ${activeTab === "records" ? styles['active-btn'] : styles['btn-outline-primary']}`}
          onClick={() => setActiveTab("records")}
        >
          Usuários Cadastrados
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
