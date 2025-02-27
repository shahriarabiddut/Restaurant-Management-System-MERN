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
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard/Items/AddItems";
import ManageItems from "../Pages/Dashboard/Items/ManageItems";
import UpdateItem from "../Pages/Dashboard/Items/UpdateItem";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/User/Payment/PaymentHistory";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

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
        path: "home",
        element: <UserHome />,
      },
      {
        path: "reservation",
        element: <h1>reservation</h1>,
      },
      {
        path: "payments",
        element: <PaymentHistory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "addReview",
        element: <h1>Add Review</h1>,
      },
      {
        path: "myBookings",
        element: <h1> My Bookings </h1>,
      },
      // Admin Routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      ,
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/menu/${params.id}`),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "manageBookings",
        element: (
          <AdminRoute>
            <h1>Manage Bookings</h1>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
