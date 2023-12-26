import { useEffect, useRef, useState } from "react";
import {
    useFetchSinglePostQuery,
    useFetchSimilarPostsQuery
} from "@/redux/services/postsServices";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "@/redux/services/commentsServices";
import { getFormValues } from "@/helpers";
import { useFetchPostCommentsQuery } from "@/redux/services/commentsServices";
import { useIncrementViewCountMutation } from "@/redux/services/postsServices";

const usePostDetails = () => {
    // get post id
    const { id } = useParams();

    // feth post
    const { data: singlePost, isError: postError, error: postErrorData, isLoading: postLoader, isSuccess, isFetching } = useFetchSinglePostQuery({ id: id });

    const hasFetched = useRef(false);
    useEffect(() => {
        if (singlePost && !hasFetched.current) {
            // Mark the post as fetched when the data is available
            hasFetched.current = true;
        }
    }, [singlePost]);


    // feth posts comments
    const { data: comments, isLoading: commentsLoader, isError: isCommentError } = useFetchPostCommentsQuery({ postId: id });

    // add comment
    const [addComment, { isLoading: addCommentLoader, isError: addCommentError }] = useAddCommentMutation();
    const submitComment = async (e) => {
        e.preventDefault();
        const { data } = getFormValues(e.currentTarget);
        e.currentTarget?.reset();
        await addComment({ postId: id, ...data });
    };

    // views
    const [incrementViewCount] = useIncrementViewCountMutation();
    const [hasViewed, setHasViewed] = useState(false);

    useEffect(() => {
        const markAsViewed = async () => {
            const hasViewedSession = sessionStorage.getItem(`viewed_${id}`);
            if (!hasViewedSession && isSuccess && singlePost) {
                await incrementViewCount(id);
                sessionStorage.setItem(`viewed_${id}`, "true");
                setHasViewed(true);
            }
        };

        markAsViewed();
    }, [isSuccess, singlePost, id, incrementViewCount, hasViewed]);

    useEffect(() => {
        const handleVisibilityChange = async () => {
            // Check if the document has focus before incrementing view count
            if (document.hasFocus() && !hasViewed && isSuccess && singlePost) {
                await incrementViewCount(id);
                sessionStorage.setItem(`viewed_${id}`, "true");
                setHasViewed(true);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isSuccess, singlePost, id, incrementViewCount, hasViewed]);


    // fetch similar psts
    const { data: similarPosts, isError: similarPostsError, isLoading: similarPostsLoader } = useFetchSimilarPostsQuery({ id: id });

    return {
        isSuccess,
        useFetchSinglePostQuery,
        singlePost,
        postError,
        postErrorData,
        postLoader,
        comments,
        commentsLoader,
        isCommentError,
        addCommentLoader,
        addCommentError,
        submitComment,
        similarPosts,
        similarPostsError,
        similarPostsLoader,
        postId: id
    };
};

export default usePostDetails;
