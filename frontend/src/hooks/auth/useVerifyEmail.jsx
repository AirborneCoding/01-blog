// useVerifyEmail.js
import { useLocation } from 'react-router-dom';
import { useVerifyEmailMutation } from '@/redux/services/authServices';
import React from 'react';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const useVerifyEmail = () => {
    const query = useQuery();

    const [verifyInfo, { isLoading, isError, error, data }] = useVerifyEmailMutation();

    const verifyEmail = async () => {
        const info = {
            verificationToken: query.get('token'),
            email: query.get('email'),
        };

        try {
            const result = await verifyInfo(info);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };


    React.useEffect(() => {
        verifyEmail();
    }, []);

    return {
        data, isLoading, error, isError
    };
};

export default useVerifyEmail;
