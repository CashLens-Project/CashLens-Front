import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Fecha menu ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Menu principal">
        <div className="navbar-content">
          {/* Lado Esquerdo: Logo + Nome */}
          <NavLink 
            to="/" 
            className="navbar-brand" 
            aria-label="Página inicial - CashLens"
          >
            <div className="logo" aria-hidden="true">CL</div>
            <span className="brand-name">CashLens</span>
          </NavLink>

          {/* Centro: Menu de Navegação (Desktop) */}
          <div className="navbar-menu">
            <div className="navbar-links" role="menubar">
              <NavLink to="/" end className="navlink" role="menuitem">
                Home
              </NavLink>
              <NavLink to="/dashboard" className="navlink" role="menuitem">
                Fluxo de Caixa
              </NavLink>
              <NavLink to="/dre" className="navlink" role="menuitem">
                Resumo Financeiro
              </NavLink>
              <NavLink to="/waterfall" className="navlink" role="menuitem">
                Análise de Lucro
              </NavLink>
            </div>
          </div>

          {/* Lado Direito: Usuário + Menu Mobile */}
          <div className="navbar-user">
            <div 
              className="user-icon" 
              title="Usuário"
              aria-label="Perfil do usuário"
              role="img"
            >
              👤
            </div>
            
            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div 
          id="mobile-menu"
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          role="menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mobile-menu-content">
            <NavLink to="/" end className="mobile-navlink" role="menuitem">
              Home
            </NavLink>
            <NavLink to="/dashboard" className="mobile-navlink" role="menuitem">
              Fluxo de Caixa
            </NavLink>
            <NavLink to="/dre" className="mobile-navlink" role="menuitem">
              Resumo Financeiro
            </NavLink>
            <NavLink to="/waterfall" className="mobile-navlink" role="menuitem">
              Análise de Lucro
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Overlay para mobile */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}