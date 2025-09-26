import { createBrowserRouter } from 'react-router-dom';
import HomeView from '../features/home/HomeView.jsx';
import AppLayout from '../layouts/AppLayout.jsx';
import DashboardView from '../features/dashboard/DashboardView.jsx';
import DREViewEnhanced from '../features/dre/DREViewEnhanced';
import WaterfallView from '../features/waterfall/WaterfallView';

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
  {
    path: '/dre',
    element: <AppLayout />,
    children: [
      { index: true, element: <DREViewEnhanced /> },
    ],
  },
  {
    path: '/waterfall',
    element: <AppLayout />,
    children: [
      { index: true, element: <WaterfallView /> },
    ],
  },
]);
