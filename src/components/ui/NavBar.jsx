import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">CashLens</div>
        <div className="navbar-menu">
          <div className="navbar-links">
            <NavLink to="/" end className="navlink">
              Home
            </NavLink>
            <NavLink to="/dashboard" className="navlink">
              Fluxo de Caixa
            </NavLink>
            <NavLink to="/dre" className="navlink">
              Resumo Financeiro
            </NavLink>
            <NavLink to="/waterfall" className="navlink">
              Análise de Lucro
            </NavLink>
            <NavLink to="/conciliation" className="navlink">
              Conciliação
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}