import React from "react";
import { FaBars, FaHome, FaMailBulk, FaShoppingCart } from "react-icons/fa";
import { FaBagShopping, FaCalendar } from "react-icons/fa6";
import { GiNotebook, GiWallet } from "react-icons/gi";
import { MdRateReview } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="flex bg-base-200 ">
      <div className="w-64 min-h-screen bg-[#d1a054]">
        <ul className="menu p-4 space-y-2">
          <li className="text-xl">
            <NavLink to={"/dashboard/home"}>
              <RiDashboardHorizontalFill /> User Home{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/dashboard/reservation"}>
              <FaCalendar /> Reservation{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/dashboard/payments"}>
              <GiWallet /> Payment History{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/dashboard/cart"}>
              <FaShoppingCart /> My Cart{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/dashboard/addreview"}>
              <MdRateReview /> Add Review{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/dashboard/mybookings"}>
              <GiNotebook /> My Bookings{" "}
            </NavLink>
          </li>
          <div className="divider"></div>
          <li className="text-xl">
            <NavLink to={"/"}>
              <FaHome /> Home{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/order/salad"}>
              <FaBars /> Menu{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/shop"}>
              <FaBagShopping /> Shop{" "}
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/contact"}>
              <FaMailBulk /> Contact{" "}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 ">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
