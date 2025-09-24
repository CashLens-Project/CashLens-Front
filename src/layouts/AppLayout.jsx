import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar.jsx';
import '../App.css';

export default function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}