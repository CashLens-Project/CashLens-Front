import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar.jsx';
<<<<<<< HEAD
import Footer from '../components/ui/Footer.jsx'; // Importe o Footer
import '../App.css';
=======
import Footer from '../components/ui/Footer.jsx';
>>>>>>> e7701ee19412eed6a389e690d498f3b8554a0b93

export default function AppLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-content">
        <Outlet />
      </div>
<<<<<<< HEAD
      {/* Footer Global - adicionado aqui */}
=======
>>>>>>> e7701ee19412eed6a389e690d498f3b8554a0b93
      <Footer />
    </div>
  );
}