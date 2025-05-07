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
import PropertyDetails from './pages/PropertyDetails.tsx'
import Booking from './pages/Booking.tsx'
import MyBookings from "./pages/MyBookings.tsx";
import AdminPortal from './pages/AdminPortal.tsx'
import LogOn from './pages/LogOn.tsx'
import Review from './pages/Review.tsx'
import ViewReviews from './pages/ViewReviews.tsx'


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
      {path: 'properties/:id', element: <PropertyDetails />},
      { path: 'booking/:propertyId', element: <Booking /> },
      { path: 'mybookings', element: <MyBookings /> },
      { path: 'Admin', element: <AdminPortal />}, 
      { path: 'Logon', element: <LogOn />},
      { path: 'review', element: <Review />},
      { path: 'reviews/:propertyId', element: <ViewReviews />},
      
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