import React from 'react'
import { FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa6'
import { GiNotebook, GiWallet } from 'react-icons/gi'
import { MdRateReview } from 'react-icons/md'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='flex'>
        <div className="w-64 min-h-screen bg-[#d1a054]">
            <ul className="menu p-4 space-y-2">
                <li className='text-xl'><NavLink to={'/dashboard/home'}><FaHome/> User Home </NavLink></li>
                <li className='text-xl'><NavLink to={'/dashboard/reservation'}><FaCalendar/> Reservation </NavLink></li>
                <li className='text-xl'><NavLink to={'/dashboard/payments'}><GiWallet/> Payment History </NavLink></li>
                <li className='text-xl'><NavLink to={'/dashboard/cart'}><FaShoppingCart/> My Cart </NavLink></li>
                <li className='text-xl'><NavLink to={'/dashboard/addreview'}><MdRateReview/> Add Review </NavLink></li>
                <li className='text-xl'><NavLink to={'/dashboard/mybookings'}><GiNotebook/> My Bookings </NavLink></li>
            </ul>
        </div>
        <div className="flex-1">
            <Outlet/>
        </div>
    </section>
  )
}

export default Dashboard