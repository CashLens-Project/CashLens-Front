import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import "./NavBar.css";

import logo from '../../../assets/logo.png';

export default function NavBar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (openSidebar) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openSidebar]);

  useEffect(() => {
    const close = () => setOpenSidebar(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Brand */}
          <div className="navbar-brand">
            <img
              src={logo}
              alt="CashLens"
              className="logo-img"
              width={28}
              height={28}
              decoding="async"
            />
            <span className="site-name">CashLens</span>
          </div>

          {/* Centro (desktop) */}
          <div className="navbar-center">
            <div className="navbar-links">
              <NavLink to="/" end className="navlink">Home</NavLink>
              <NavLink to="/dashboard" className="navlink">Fluxo de Caixa</NavLink>
              <NavLink to="/dre" className="navlink">Resumo Financeiro</NavLink>
              <NavLink to="/waterfall" className="navlink">Análise de Lucro</NavLink>
              <NavLink to="/conciliation" className="navlink">Reconciliação</NavLink>
            </div>
          </div>

          {/* Usuário (vai pra direita no mobile) */}
          <button className="user-button" aria-label="Usuário" title="Usuário" type="button">
            <FiUser size={22} />
          </button>

          {/* Burger (fica à esquerda do brand no mobile) */}
          <button
            className="navbar-burger"
            aria-label="Abrir menu"
            aria-expanded={openSidebar ? "true" : "false"}
            onClick={() => setOpenSidebar(true)}
            type="button"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Overlay + Sidebar fora do nav */}
      <div
        className={`sidebar-overlay ${openSidebar ? "open" : ""}`}
        onClick={() => setOpenSidebar(false)}
      />
      <aside
        className={`sidebar ${openSidebar ? "open" : ""}`}
        aria-hidden={openSidebar ? "false" : "true"}
      >
        <div className="sidebar-header">
          <div className="navbar-brand">
            <img
              src={logo}
              alt="CashLens"
              className="logo-img"
              width={28}
              height={28}
              decoding="async"
            />
            <span className="site-name">CashLens</span>
          </div>
          <button
            className="sidebar-close"
            aria-label="Fechar menu"
            onClick={() => setOpenSidebar(false)}
            type="button"
          >
            <FiX size={22} />
          </button>
        </div>
        <nav className="sidebar-links">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={() => setOpenSidebar(false)}>Home</NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={() => setOpenSidebar(false)}>Fluxo de Caixa</NavLink>
          <NavLink 
            to="/dre" 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={() => setOpenSidebar(false)}>Resumo Financeiro</NavLink>
          <NavLink 
            to="/waterfall" 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={() => setOpenSidebar(false)}>Análise de Lucro</NavLink>
          <NavLink 
            to="/conciliation" 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={() => setOpenSidebar(false)}>Reconciliação</NavLink>
        </nav>
      </aside>
    </>
  );
}
