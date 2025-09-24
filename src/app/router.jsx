import { createBrowserRouter } from 'react-router-dom';
import HomeView from '../features/home/HomeView.jsx';
import AppLayout from '../layouts/AppLayout.jsx';
import DashboardView from '../features/dashboard/DashboardView.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/dashboard',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardView /> },
    ],
  },
]);