import {
    useFetchAllPostsQuery,
    useFetchSinglePostQuery,
    useFetchSimilarPostsQuery
} from "@/redux/services/postsServices";
import { useSelector } from "react-redux"
const useHome = () => {
    const { user } = useSelector(state => state?.auth)
    return {
        user,
        useFetchAllPostsQuery,
        useFetchSinglePostQuery,
        useFetchSimilarPostsQuery
    };
};

export default useHome;
