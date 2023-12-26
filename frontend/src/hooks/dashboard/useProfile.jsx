import {
    useFetchUserProfileQuery, useUpdateUserProfileMutation, useUploadAvatarMutation
} from "@/redux/services/usersServices";
import { getFormValues } from "@/helpers"
import { displayToast } from "@/utils"
import { useSelector } from "react-redux";
import { useState } from "react";
const useProfile = () => {

    // fetch user
    const { user } = useSelector((state) => state.auth);
    // Fetch user profile
    if (user) {
        var {
            data: userProfile,
            isLoading: loadingUser,
            isError: userError,
            error: userErrorData
        } = useFetchUserProfileQuery();
    }

    // update
    const [updateUserProfile, {
        isLoading: editProfileLoader,
        isError: isEditProfileError,
    }] = useUpdateUserProfileMutation();

    const onSubmit = async (e) => {
        e.preventDefault()
        const requiredFields = ['email', 'username'];

        const { data } = getFormValues(e.currentTarget, requiredFields)
        e.currentTarget?.reset()
        try {
            await updateUserProfile(data).unwrap();
            displayToast("Profile updated successfully", "success")
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);
        }
    }

    // avatar
    const [avatar, setAvatar] = useState(null);

    var [res, { isLoading: isAvatarLoader, isError, error }] = useUploadAvatarMutation()

    const handleAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatar);
        try {
            await res(formData);
            displayToast("Profile photo updated successfully", "success")
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);
        }

    };

    return {
        //fetch user
        userProfile,
        loadingUser,
        userError,
        userErrorData,
        // edit
        onSubmit,
        editProfileLoader,
        isEditProfileError,
        //avatra
        avatar,
        setAvatar,
        handleAvatar,
        isAvatarLoader
    };
};

export default useProfile;
