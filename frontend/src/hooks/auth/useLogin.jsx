// useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@/redux/services/authServices';
import { displayToast } from "@/utils"
import { useDispatch } from 'react-redux';
import { login } from "@/redux/slices/authSlice";
import { getFormValues } from '@/helpers';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRemembered, setIsRemembered] = useState(true);
    const [loginUserMutation, { isLoading, isError, error, data }] = useLoginUserMutation();

    const handleLogin = async (e) => {
        e.preventDefault()
        const { data } = getFormValues(e.currentTarget)
        e.currentTarget?.reset()

        try {
            const result = await loginUserMutation(data).unwrap();
            dispatch(login(result));
            displayToast("login success", "success")
            navigate('/');
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);

        }
    };

    return {
        isRemembered,
        setIsRemembered,
        isLoading,
        isError,
        error,
        data,
        handleLogin,
    };
};

export default useLogin;
