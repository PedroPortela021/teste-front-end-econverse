import { createBrowserRouter } from 'react-router-dom'
import { DesignTokensPage } from '../pages/desing/Design.tsx'
import { Home } from '../pages/home/Home.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/desing',
    element: <DesignTokensPage />,
  },
])
