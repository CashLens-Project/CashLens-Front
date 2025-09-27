import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar/NavBar.jsx';
import Footer from '../components/ui/Footer/Footer.jsx';

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