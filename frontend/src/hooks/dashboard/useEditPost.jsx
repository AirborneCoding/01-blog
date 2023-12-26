import { useFetchSinglePostQuery, useEditPostMutation } from "@/redux/services/postsServices";
import { displayToast } from "@/utils";
import { useParams, useNavigate } from "react-router-dom";
import { getFormValues } from "@/helpers"

const useEditPost = () => {
    const navigate = useNavigate()

    // single post
    const { id } = useParams();
    const { data: singlePost, isError: postError, error: postErrorData, isLoading: postLoader, isSuccess } = useFetchSinglePostQuery({ id: id });


    const [updatePost, {
        isLoading: editLoader,
        isError: editError,
        error: editErr
    }] = useEditPostMutation();

    // edit post
    const onSubmit = async (e) => {
        e.preventDefault()
        const { data } = getFormValues(e.currentTarget)
        e.currentTarget?.reset()
        try {
            await updatePost({ body: data, id }).unwrap();
            displayToast("Post updated successfully", "success")
            navigate("/my_profile/my_posts")
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);
        }
    }

    return {
        singlePost,
        postError,
        postErrorData,
        postLoader,
        //
        onSubmit,
        id,
        //
        editLoader,
        editError
    }
};

export default useEditPost;
