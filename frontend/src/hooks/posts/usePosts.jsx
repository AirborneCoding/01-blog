import {
    useFetchAllPostsQuery,
} from "@/redux/services/postsServices";
import { useSelector } from "react-redux"

import  { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { debounce } from 'lodash';


const usePosts = () => {
    const { user } = useSelector(state => state?.auth)

    // params search 
    const location = useLocation();
    const search = location?.search;
    const searchPage = new URLSearchParams(search).get('page');

    // search
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isFetching, isError, refetch, isLoading } = useFetchAllPostsQuery({
        search: searchTerm,
        page: searchPage ?? 1,
    });

    // lodash change
    const handleSearch = useMemo(() =>
        debounce(() => {
            refetch({ search: searchTerm });
        }, 300), [refetch, searchTerm]
    );

    const handleChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        handleSearch();
    }, []);

    const { posts, pagination } = data || {};
    const { total: totalData, pageCount, page } = pagination ?? {}


    return {
        user,
        useFetchAllPostsQuery,
        pageCount,
        totalData,
        pagination,
        posts,
        isFetching,
        refetch,
        page,
        searchTerm,
        handleChange
    };
};

export default usePosts;


/* 
const location = useLocation();
    const search = location?.search;
    const searchPage = new URLSearchParams(search).get('page');

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

    const handleChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        handleSearch();
    }, []);

    const { posts, pagination } = data || {};
    const { total: totalData, pageCount, page } = pagination ?? {}
*/