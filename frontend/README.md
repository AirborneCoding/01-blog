import React, { useState } from "react";
import { FaBell } from '@/assets/icons';
import { logoutUser } from "@/utils";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
const Info = ({ user }) => {
    const disptach = useDispatch()
    const [profileInfo, setProfileInfo] = useState(false)

    return <>
        {user ? (

            // users exist
            <div className="account flexCenter">
                {/* notif */}
                {/* user info */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                {/* <div className="overflow-hidden z-50">
                    <img
                        src={user?.avatar}
                        alt="Profile"
                        className="md:w-12 md:h-12 w-9 h-9 rounded-full object-cover cursor-pointer"
                        onClick={() => setProfileInfo(!profileInfo)}
                    />
                    {
                        profileInfo && (
                            <div className='openProfile boxItems z-50'>
                                <Link to="/my_profile" className='box'>
                                    <BsBagCheck className='icon' />
                                    <h4>My Profile</h4>
                                </Link>
                                <Link to="/write_post" className='box'>
                                    <RiImageAddLine className='icon' />
                                    <h4>Wishlist</h4>
                                </Link>
                                <Link to="my_posts" className='box'>
                                    <IoSettingsOutline className='icon' />
                                    <h4>Help</h4>
                                </Link>
                                <Link to="settings" className='box'>
                                    <IoSettingsOutline className='icon' />
                                    <h4>Log Out</h4>
                                </Link>
                                <button onClick={() => { disptach(logoutUser()) }} className='box'>
                                    <BiLogOut className='icon' />
                                    <h4>Log Out</h4>
                                </button>
                            </div>
                        )
                    }
                </div > */}

            </div>
        ) : (
            // users not exist
            <Link to="/login" className="pt-1.5 cursor-pointer">
                <button className="text-gray-100 font-medium text-[18px] bg-blog border-2 rounded-xl px-2 py-1 cursor-pointer w-44">
                    Get Started
                </button>
            </Link>
        )}
    </>;
};

export default Info;

/* 
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
*/
/*
                <div className="overflow-hidden z-50">
                    <img
                        src={user?.avatar}
                        alt="Profile"
                        className="md:w-12 md:h-12 w-9 h-9 rounded-full object-cover cursor-pointer"

                    />
                    {
                        profileInfo && (
                            <ul className="absolute top-16 -right-2 bg-white border border-gray-200 rounded-md shadow-md  w-64 z-1">
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile">My Profile</Link>
                                </li>
                                <hr />
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile/addPost">Add Article</Link>
                                </li>
                         
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile/settings">Settings</Link>
                                </li>
                                <li
                                    className="hover:bg-blog hover:text-white py-2 px-3 cursor-pointer">
                                    Log-out
                                </li>


                            </ul >
                        )
                    }

                </div > 
 */