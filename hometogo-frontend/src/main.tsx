import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Router, RouterProvider, BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/custom/Header.tsx'
import Role from './pages/Role.tsx'
import Landing from './pages/Landing.tsx'
import Properties from './pages/Properties.tsx'
import { Outlet } from 'react-router-dom'
import Booking from './pages/Booking.tsx'

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <App /> },
      { path: 'properties', element: <Properties /> },
      { path: 'Role', element: <Role /> },
      { path: 'landing', element: <Landing /> },
      { path: 'booking', element: <Booking /> },
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)