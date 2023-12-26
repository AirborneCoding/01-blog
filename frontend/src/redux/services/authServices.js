import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { developmentUrl } from '@/utils';

const authServices = createApi({
    reducerPath: 'auth_services',
    baseQuery: fetchBaseQuery({ baseUrl: developmentUrl }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authServices;

export default authServices;
