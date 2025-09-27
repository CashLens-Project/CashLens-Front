import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar.jsx';
import Footer from '../components/ui/Footer.jsx';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      {/* NavBar com container */}
      <nav className="navbar">
        <div className="navbar-content">
          <NavBar />
        </div>
      </nav>

      {/* Conteúdo principal com container */}
      <div className="app-content">
        <Outlet />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
      <Footer />

      {/* Footer com container */}
      <footer className="app-footer">
        <div className="footer">
          <Footer />
        </div>
      </footer>
    </div>
  );
}