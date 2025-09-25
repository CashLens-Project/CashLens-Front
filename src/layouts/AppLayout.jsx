import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar.jsx';
import Footer from '../components/ui/Footer.jsx';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}