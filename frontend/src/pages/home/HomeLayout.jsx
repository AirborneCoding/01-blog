import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components";
// import { Loading } from "@/helpers";
// import { Error } from "@/errors";
// import useHome from "@/hooks/home/useHome";
import Nav from "../../components/layouts/header/Nav"

const HomeLayout = () => {



    return <>
        <Nav />
        <Outlet />
        <Footer />
    </>;
};

export default HomeLayout;

// context={{ homePosts, user, useFetchAllPostsQuery }}


/* 
    const {
        user,
        useFetchAllPostsQuery,
        homePosts,
        // homeLoading,
        // isHomeError,
        // HomeError,
        // refetch
    } = useHome();


    // if (homeLoading) {
    //     return <Loading />
    // }

    // if (isHomeError) {
    //     return <Error status={HomeError} />
    // }
*/