import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar.jsx';
import Topbar from '../components/ui/Topbar.jsx';
import '../App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}