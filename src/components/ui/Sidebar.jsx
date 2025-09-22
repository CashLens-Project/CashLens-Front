import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">CashLens</div>
      <nav>
        <NavLink to="/" end className="navlink">
          Dashboard
        </NavLink>
        <NavLink to="/settings" className="navlink">
          Configurações
        </NavLink>
      </nav>
    </aside>
  );
}