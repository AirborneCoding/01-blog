import React, { useState } from "react";
import { FaBell } from '@/assets/icons';
import { logoutUser } from "@/utils";
import { Link } from "react-router-dom";

const Info = ({ user }) => {
    const [notificationCount, setNotificationCount] = useState(1)

    const [notifications, setNotifications] = useState([
        "Notification 1",
        "Notification 2",
        "Notification 3",
        "Notification 1",
        "Notification 2",
        "Notification 3",

    ]);
    const [showNotifications, setShowNotifications] = useState(false);


    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        setNotificationCount(0);
        setProfileInfo(false);
    };


    // profile handler
    const [profileInfo, setProfileInfo] = useState(false)
    const handleProfileInfoClick = () => {
        setProfileInfo(!profileInfo);
        setShowNotifications(false);
    };
    return <>
        {user ? (

            // users exist
            <div className="flex">
                {/* NOTIFICATIONS */}
                <div className="relative z-50">
                    <button
                        onClick={handleNotificationClick}
                        className="p-1 md:w-12 md:h-12 w-9 h-9 rounded-full  text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 cursor-pointer relative"
                    >

                        <FaBell size={28} />
                        {/* Display notification count when it's greater than 0 */}
                        {notificationCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                {notificationCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute top-14 right-0 bg-white border border-gray-200 rounded-md shadow-md p-2 w-96 z-1">
                            {notifications.map((notification, index) => (
                                <div key={index} className="mb-2 flex items-end space-x-2">
                                    <img
                                        src={user?.avatar}
                                        alt=""
                                        className="object-cover h-10 w-10 rounded-full"
                                        loading="lazy"
                                    />
                                    <p className="pb-2" >
                                        {notification}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* user info */}
                <div className="overflow-hidden z-50">
                    <img
                        src={user?.avatar}
                        alt="Profile"
                        className="md:w-12 md:h-12 w-9 h-9 rounded-full object-cover cursor-pointer"
                        onClick={handleProfileInfoClick}
                        loading="lazy"
                    />
                    {
                        profileInfo && (
                            <ul className="absolute top-16 right-20 bg-white border border-gray-200 rounded-md shadow-md  w-64 z-1">
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile">My Profile</Link>
                                </li>
                                <hr />
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile/addPost">Add Article</Link>
                                </li>
                                {/* <hr /> */}
                                <li className="hover:bg-blog hover:text-white py-2 px-3">
                                    <Link to="/profile/settings">Settings</Link>
                                </li>
                                <li
                                    onClick={() => dispatch(logoutUser())}
                                    className="hover:bg-blog hover:text-white py-2 px-3 cursor-pointer">
                                    Log-out
                                </li>


                            </ul>
                        )
                    }

                </div>
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
*/