import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@/components";
import { Loading } from "@/helpers";
import { Error } from "@/errors";
import useHome from "@/hooks/home/useHome";
import Nav from "../../components/layouts/header/Nav"
import Header from "../../components/layouts/header/Header"

const HomeLayout = () => {

    const {
        user,
        useFetchAllPostsQuery
    } = useHome();

    const {
        data: homePosts,
        isLoading: homeLoading,
        isError: isHomeError,
        error: HomeError,
        refetch,
    } = useFetchAllPostsQuery({
        pageSize: 22
    });

    useEffect(() => {
        // Fetch posts when the component mounts
        refetch();
    }, [refetch]);

    if (homeLoading) {
        return <Loading />
    }

    if (isHomeError) {
        return <Error status={HomeError} />
    }

    return <>
        {/* <Navbar user={user} /> */}
        {/* <Header user={user} /> */}
        <Nav user={user} />
        <Outlet context={{ homePosts, user, useFetchAllPostsQuery }} />
        <Footer />
    </>;
};

export default HomeLayout;




// import { QueryMonitor } from "@reduxjs/toolkit/query/react";
{/* <QueryMonitor>

</QueryMonitor> */}