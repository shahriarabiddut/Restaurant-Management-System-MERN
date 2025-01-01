import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Shared/Secret";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },{
                path: '/menu',
                element: <Menu/>
            },{
                path: '/order/:category',
                element: <Order/>
            },{
                path: '/login',
                element: <Login/>
            },{
                path: '/signup',
                element: <SignUp/>
            },{
                path: '/secret',
                element: <PrivateRoute><Secret/></PrivateRoute> 
            }
        ]
    }
]);

export default router