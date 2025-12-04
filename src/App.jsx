
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Homelayout from "./pages/Homelayout"
import LandingPage from "./pages/LandingPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import AddProduct from "./pages/AddProduct"
import Orders from "./pages/Orders"
import Settings from "./pages/Settings"
import Details from "./pages/details"
import Checkout from "./pages/Checkout"
import Success from './pages/Success'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);
import ProtectedLayout from "./pages/ProtectedLayout"
// =========================================================
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'

// ========================================================

import { loader as userLoader } from "./pages/ProtectedLayout"
import { loader as currentLoader} from "./pages/details"
// import { loader as prodLoader } from "./pages/Products"





 const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "register", element: <Register />, action: registerAction },
      { path: "login", element: <Login />, action: loginAction },
      {
        path: "paynow",
        element: (
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedLayout />,
    loader: userLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "details/:id", element: <Details />, loader: currentLoader },
      { path: "settings", element: <Settings /> },
      { path: "success", element: <Success/> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}