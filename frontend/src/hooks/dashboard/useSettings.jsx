import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getFormValues } from "@/helpers";
import { useChangePasswordMutation, useDeleteUserProfileMutation } from "@/redux/services/usersServices"
import { displayToast, logoutUser } from "@/utils"

const useSettings = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [deleteUser, { isSuccess: deleteProfileSucess, isLoading: deleteLoader }] = useDeleteUserProfileMutation();

    const deleteUserProfile = () => {
        try {
            deleteUser()
            dispatch(logoutUser())
            setModal(false)
            displayToast("Your profile has bee deleted", "success")
            navigate('/')
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            // console.error(error);
        }
    }

    const [changePassword, { isLoading: passLoader, error: passError }] = useChangePasswordMutation()

    const onSubmit = async (e) => {
        e.preventDefault()
        const { data } = getFormValues(e.currentTarget)
        e.currentTarget?.reset()

        try {
            await changePassword(data).unwrap();
            displayToast("Passowrd changed successfully", "success")
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            // console.error(error);
        }
    };

    return {
        deleteLoader,
        passLoader,
        deleteUserProfile,
        onSubmit
    };
};

export default useSettings;
