import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import "./NavBar.css";

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="clg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--text)" />
        </linearGradient>
      </defs>
      <rect rx="10" width="48" height="48" fill="url(#clg)" />
      <path
        d="M14 30c4 4 10 4 14 0l6 6M18 18c2.5-2.5 6.5-2.5 9 0"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
            <LogoMark />
            <span className="site-name">CashLens</span>
          </div>

          {/* Centro (desktop) */}
          <div className="navbar-center">
            <div className="navbar-links">
              <NavLink to="/" end="true" className="navlink">Home</NavLink>
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
            <LogoMark />
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
            end="true" 
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