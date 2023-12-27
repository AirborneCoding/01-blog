import {
    useFetchAllPostsQuery,
    // useFetchSinglePostQuery,
    // useFetchSimilarPostsQuery
} from "@/redux/services/postsServices";
import { useSelector } from "react-redux"
const useHome = () => {
    const { user } = useSelector(state => state?.auth)
    const {
        data: homePosts,
        isLoading: homeLoading,
        isError: isHomeError,
        error: HomeError,
        refetch,
    } = useFetchAllPostsQuery({
        pageSize: 22
    });

    return {
        user,
        useFetchAllPostsQuery,
        homePosts,
        homeLoading,
        isHomeError,
        HomeError,
        refetch
        // useFetchSinglePostQuery,
        // useFetchSimilarPostsQuery
    };
};

export default useHome;
