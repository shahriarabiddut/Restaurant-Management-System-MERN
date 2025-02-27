import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged Out"))
      .catch((error) => console.log(error));
  };
  const [cart] = useCart();
  const navOptions = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/menu"}>Menu</NavLink>
      </li>
      <li>
        <NavLink to={"/order/salad"}>Order</NavLink>
      </li>
      {user && isAdmin && (
        <>
          <li>
            <NavLink to={"/dashboard/adminHome"}>Dashboard</NavLink>
          </li>
        </>
      )}
      {user && !isAdmin && (
        <>
          <li>
            <NavLink to={"/dashboard/home"}>Dashboard</NavLink>
          </li>
        </>
      )}
      {user ? (
        <>
          <li>
            <span className="bg-slate-400 mx-1">{user?.displayName}</span>
          </li>
          <li>
            <button className="bg-slate-400 mx-1" onClick={handleLogout}>
              LogOut
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </>
      )}
      {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2 bg-black">
            <li className='hover:text-black hover:bg-white'><a>Submenu 1</a></li>
            <li className='hover:text-black hover:bg-white'><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> */}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">{import.meta.env.VITE_NAME}</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <Link to={`/dashboard/cart`}>
              <button className="btn">
                <FaCartShopping />
                <div className="badge badge-secondary">+{cart.length}</div>
              </button>{" "}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
