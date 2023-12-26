import { useFetchAuthorsQuery, useFethAuthorPostsQuery, useGetAuthorProfileQuery } from "../../redux/services/authorsServices";
import { useParams } from "react-router-dom";

const UseAuthors = () => {
    const { id } = useParams();
    const { data: author, isError: authorError, isLoading: authorLoader } = useGetAuthorProfileQuery({ id: id });

    const { data: authorPosts, isError: authorPostsError, isLoading: authorPostsLoader } = useFethAuthorPostsQuery({ id: id });

    const { data: authors, isError: authorsError, isLoading: authorsLoader } = useFetchAuthorsQuery();


    return {
        authorId: id,
        // author
        author,
        authorLoader,
        authorError,
        // author posts
        authorPosts,
        authorPostsLoader,
        authorPostsError,
        //authors
        authors,
        authorsLoader,
        authorsError,
    };
};

export default UseAuthors;
