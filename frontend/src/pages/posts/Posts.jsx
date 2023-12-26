import React, { useState, useMemo } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { debounce } from 'lodash';
import { Filters, Categories, Authors, PostsData } from "../../components";
import { Loading, Pagination } from "@/helpers"
const Posts = () => {
    window.scrollTo(0, 100)
    const location = useLocation();
    const search = location?.search;
    const searchPage = new URLSearchParams(search).get('page');

    const { user, useFetchAllPostsQuery } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryTerm, setCategoryTerm] = useState('');
    const { data, isFetching, isError, refetch, isLoading } = useFetchAllPostsQuery({
        search: searchTerm,
        page: searchPage ?? 1,
        category: categoryTerm
    });

    const handleSearch = useMemo(() =>
        debounce(() => {
            refetch({ search: searchTerm });
        }, 300), [refetch, searchTerm]
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch();
    };

    const { posts, pagination } = data || {};
    const { total: totalData, pageCount, page } = pagination ?? {}


    const handleCategoryClick = (category) => {
        setCategoryTerm(category);
        refetch({ category: category });
    };

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
                    {/* {isFetching ? (
                        <Loading />
                    ) : (
                        <PostsData
                            user={user}
                            posts={posts}
                            totalData={totalData}
                        />
                    )} */}
                    <PostsData
                        user={user}
                        posts={posts}
                        totalData={totalData}
                    />
                </div>

                <div className="hidden xl:flex flex-none w-1/4 p-4 ">
                    <Categories onCategoryClick={handleCategoryClick} />
                </div>
            </section>
            <Pagination
                pageCount={pageCount}
                page={page}
            />
        </main>
    );
};

export default Posts;