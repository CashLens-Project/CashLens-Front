import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import DashboardView from '../features/dashboard/DashboardView.jsx';
import SettingsView from '../features/settings/SettingsView.jsx';
import DREViewEnhanced from '../features/dre/DREViewEnhanced';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'dre', element: <DREViewEnhanced /> },
    ],
  },
]);