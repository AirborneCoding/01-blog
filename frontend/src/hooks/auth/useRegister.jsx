import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '@/redux/services/authServices';
import { displayToast } from "@/utils"
import { getFormValues } from '@/helpers';

const useRegister = () => {
    const navigate = useNavigate();
    const [RegisterUserMutation, { isLoading, isError, error, data }] = useRegisterUserMutation();

    const handleRegister = async (e) => {
        e.preventDefault()
        const { data } = getFormValues(e.currentTarget)
        e.currentTarget?.reset()

        try {
            const result = await RegisterUserMutation(data).unwrap();
            displayToast("register success, please log-in", "success")
            navigate('/login');
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);

        }
    };

    return {
        isLoading,
        isError,
        error,
        data,
        handleRegister,
    };
};

export default useRegister;
