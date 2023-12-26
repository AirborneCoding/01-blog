import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "@/redux/services/postsServices";
import { displayToast } from "@/utils"
const useWritePost = () => {

    // add post
    const [addPost, { isLoading: postLoader }] = useAddPostMutation();
    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });
        const postStatus = formData.get("postStatus");
        try {
            await addPost(formData).unwrap();
            displayToast("Pots created", "success")
            if (postStatus === "archived") {
                navigate('/my_profile/my_posts')
            } else {
                navigate('/')
            }
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);

        }
    };

    const handleInputChange = (e) => {
        const form = e.currentTarget;
        setIsFormValid(form.checkValidity());
    };


    return {
        onSubmit,
        isFormValid,
        postLoader,
        handleInputChange
    };
};

export default useWritePost;
