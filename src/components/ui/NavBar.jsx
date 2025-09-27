import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Adiciona ou remove a classe no corpo quando o menu mobile é aberto/fechado
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Limpa a classe quando o componente desmontar
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Fecha menu ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Menu principal">
        <div className="navbar-content">
          {/* Lado Esquerdo: Logo + Nome */}
          <NavLink 
            to="/" 
            className="navbar-brand" 
            aria-label="Página inicial - CashLens"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="logo" aria-hidden="true">CL</div>
            <span className="brand-name">CashLens</span>
          </NavLink>

          {/* Centro: Menu de Navegação (Desktop) */}
          <div className="navbar-menu">
            <div className="navbar-links" role="menubar">
              <NavLink 
                to="/" 
                end 
                className="navlink" 
                role="menuitem"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className="navlink" 
                role="menuitem"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fluxo de Caixa
              </NavLink>
              <NavLink 
                to="/dre" 
                className="navlink" 
                role="menuitem"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resumo Financeiro
              </NavLink>
              <NavLink 
                to="/waterfall" 
                className="navlink" 
                role="menuitem"
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
              tabIndex={0}
            >
              👤
            </div>
            
            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              type="button"
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
            <NavLink 
              to="/" 
              end 
              className="mobile-navlink" 
              role="menuitem"
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className="mobile-navlink" 
              role="menuitem"
              onClick={toggleMobileMenu}
            >
              Fluxo de Caixa
            </NavLink>
            <NavLink 
              to="/dre" 
              className="mobile-navlink" 
              role="menuitem"
              onClick={toggleMobileMenu}
            >
              Resumo Financeiro
            </NavLink>
            <NavLink 
              to="/waterfall" 
              className="mobile-navlink" 
              role="menuitem"
              onClick={toggleMobileMenu}
            >
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
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMobileMenu();
            }
          }}
        />
      )}
    </>
  );
}