import React, { useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import NavSearch from "../navbar/NavSearch"
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "@/utils"
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className='bg-gray-300 pb-5 shadow-lg'>
      <div className='navbar align-element body-container'>
        <div className='navbar-start'>
          {/* TITLE */}
          <NavLink to="/" className="text-black pt-4 hidden lg:flex ">
            <h2 className="text-xl md:text-3xl font-bold ">
              <span className="bg-gray-800 text-white px-1 rounded-md shadow-lg mr-0.5" >Air</span>borne
            </h2>
          </NavLink>

          {/* DROPDOWN - Mobile View */}
          <div className='dropdown lg:hidden'>
            <label tabIndex={0} className='btn btn-ghost'>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-blog text-white '
            >
              <NavLinks />
            </ul>
          </div>

          <div className='md:mx-4'>
            <NavSearch />
          </div>
        </div>

        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal text-[18px] font-semibold'>
            <NavLinks />
          </ul>
        </div>

        <div className='navbar-end'>
          {user ? (
            <>
              <div tabIndex={1} className='dropdown indicator gap-x-4 -2 '>
                <button className='btn btn-ghost' onClick={toggleProfileDropdown}>
                  <img src={user?.avatar} alt={user?.username} className='rounded-full w-12 h-12 object-cover' loading="lazy" />
                  {/* <div className="text pt-2 text-xl">{user?.name}</div> */}
                </button>
                {isProfileDropdownOpen && (
                  <ul className='relative -left-36 menu menu-sm dropdown-content mt-16 z-[1] p-2 w-52 shadow rounded-box  bg-blog text-white '>
                    {/* Dropdown items for user profile go here */}
                    <li className='capitalize hover:bg-white hover:text-blog py-3'>
                      <Link to='/my_profile'>Profile</Link>
                    </li>
                    <li className='capitalize hover:bg-white hover:text-blog py-3'>
                      <Link to='/my_profile/write_post'>add post</Link>
                    </li>
                    <li className='capitalize hover:bg-white hover:text-blog py-3'>
                      <Link to='/my_profile/my_posts'>my posts</Link>
                    </li>
                    <li className='capitalize hover:bg-white hover:text-blog py-3'>
                      <Link to='/my_profile/settings'>Settings</Link>
                    </li>
                    <li onClick={() => { dispatch(logoutUser()) }} className='capitalize hover:bg-white hover:text-blog py-3'>
                      <button>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className='swap swap-rotate btn btn-primary text-[17px]'>
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
