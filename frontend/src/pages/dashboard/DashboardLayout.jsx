// DashboardLayout.js
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/layouts/sidebar/Navbar"
import BigSidebar from "@/components/layouts/sidebar/BigSidebar"
import SmallSidebar from "@/components/layouts/sidebar/SmallSidebar"
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "@/utils"
import useProfile from "../../hooks/dashboard/useProfile"
import { Loading } from "@/helpers"

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

const Dashboard = () => {

    // const { user } = useSelector(state => state?.auth)
    const {
        //fetch user
        userProfile,
        loadingUser,
    } = useProfile()



    const dispatch = useDispatch()
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }

    return <Wrapper className="bg-opacity-50 h-screen">
        <main className='dashboard'>
            <SmallSidebar
                toggleSidebar={toggleSidebar}
                showSidebar={showSidebar}
            />
            <BigSidebar
                toggleSidebar={toggleSidebar}
                showSidebar={showSidebar}
            />
            <div>
                <Navbar
                    toggleSidebar={toggleSidebar}
                    showSidebar={showSidebar}
                    handleLogout={handleLogout}
                />
                <div className='dashboard-page'>
                    {loadingUser ? <Loading /> : <Outlet context={{ user: userProfile, handleLogout }} />}
                </div>

            </div>
        </main>
    </Wrapper>
};

export default Dashboard;















/* 
import React, { useState } from "react";
import Navbar from "@/components/layouts/sidebar/Navbar";
import Sidebar from "@/components/layouts/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <main className={`${sidebarVisible && "grid lg:grid-cols-5"}`}>
            {
                sidebarVisible && (
                    <div className='hidden lg:block lg:col-span-1 lg:min-h-screen bg-blog text-white'>
                        <Sidebar />
                    </div>
                )
            }
            <div className='lg:col-span-4 '>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className='py-16 px-4 sm:px-8 lg:px-16'>
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;


*/