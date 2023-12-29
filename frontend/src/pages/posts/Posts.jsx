import React, { useState, useMemo, useCallback } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { debounce } from 'lodash';
import { Filters, Categories, Authors, PostsData } from "../../components";
import { Loading, Pagination } from "@/helpers"
import usePosts from "../../hooks/posts/usePosts";

const Posts = () => {
    window.scrollTo(0, 100)

    const {
        user,
        pageCount,
        totalData,
        posts,
        isLoading,
        page,
        searchTerm,
        isFetching,
        handleChange
    } = usePosts();

    return (
        <main className="body-container w-full overflow-hidden text-base text-black font-libre-baskerville mt-16 min-h-screen">
            <Filters
                handleSearchChange={handleChange}
                searchValue={searchTerm}
            />

            <section className="py-10 mt-10 flex">
                <div className="hidden xl:flex flex-none w-1/4 p-4 ">
                    <Authors />
                </div>

                <div className="flex-grow pb-4">
                    {isLoading || isFetching ? (
                        <Loading />
                    ) : (
                        <>
                            <PostsData
                                user={user}
                                posts={posts}
                                totalData={totalData}
                            />
                            <Pagination
                                pageCount={pageCount}
                                page={page}
                            />
                        </>
                    )}
                    {/* <PostsData
                        user={user}
                        posts={posts}
                        totalData={totalData}
                    /> */}
                </div>

                <div className="hidden xl:flex flex-none w-1/4 p-4 ">
                    <Categories />
                </div>
            </section>

        </main>
    );
};

export default Posts;