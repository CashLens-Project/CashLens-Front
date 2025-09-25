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
              DashBoard
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}