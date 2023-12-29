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
        verifyEmail: builder.mutation({
            query: (verifyInfo) => ({
                url: `/auth/verify-email`,
                method: 'POST',
                body: verifyInfo,
            }),
        }),
        // Add other mutations here
        updateUserProfile: builder.mutation({
            query: (updateData) => ({
                url: '/auth/update-profile',
                method: 'PUT',
                body: updateData,
            }),
        }),
        sendResetPasswordLink: builder.mutation({
            query: (data) => ({
                url: '/password/reset-password-link',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (resetData) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: resetData,
            }),
        }),

    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useSendResetPasswordLinkMutation,
    useUpdateUserProfileMutation,
    useResetPasswordMutation,
} = authServices;

export default authServices;
