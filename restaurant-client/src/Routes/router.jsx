import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Shared/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../Pages/Dashboard/User/Cart/Cart";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/home",
        element: <h1>Dashboard</h1>,
      },
      {
        path: "/dashboard/reservation",
        element: <h1>reservation</h1>,
      },
      {
        path: "/dashboard/payments",
        element: <h1>Payment History</h1>,
      },
      {
        path: "/dashboard/cart",
        element: <Cart />,
      },
      {
        path: "/dashboard/addReview",
        element: <h1>Add Review</h1>,
      },
      {
        path: "/dashboard/myBookings",
        element: <h1> My Bookings </h1>,
      },
      // Admin Routes

      {
        path: "/dashboard/users",
        element: <AllUsers />,
      },
    ],
  },
]);

export default router;
