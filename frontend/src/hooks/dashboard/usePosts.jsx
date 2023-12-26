import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDeleteMyPostMutation, useFetchMyPostsQuery } from "@/redux/services/usersServices"
const usePosts = () => {

    // toggle compoennt
    const [activeComponent, setActiveComponent] = useState("published");

    const handleComponentChange = (componentType) => {
        setActiveComponent(componentType);
    };

    const location = useLocation();
    const search = location?.search;
    const searchPage = new URLSearchParams(search).get("page");
    const [selectedSort, setSelectedSort] = useState("latest");

    const {
        data: myPosts,
        isLoading: myPostsLoder,
        isError: isMyPostsError,
        error: myPostsError,
        refetch
    } = useFetchMyPostsQuery(
        {
            postStatus: activeComponent,
            page: searchPage ?? 1,
            sort: selectedSort,
        },
        { manual: true }
    );

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        console.log(newSort);
        setSelectedSort(newSort);

        // Refetch data with the new sorting option
        refetch({
            postStatus: activeComponent,
            page: searchPage ?? 1,
            sort: newSort,
        });
    };


    // delete post
    const [deletePost, { isLoading: deleteLoader }] = useDeleteMyPostMutation()
    const handleDeletePost = async (id) => {
        await deletePost({ id })
    }

    // toggles
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };




    return {
        myPosts,
        myPostsLoder,
        isMyPostsError,
        myPostsError,
        handleSortChange,
        // delete post
        deleteLoader,
        handleDeletePost,
        // toggles
        isDropdownOpen,
        toggleDropdown,
        // tooglert com
        handleComponentChange,
        activeComponent,
        setActiveComponent,
    };
};

export default usePosts;
