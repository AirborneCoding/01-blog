import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { developmentUrl } from "@/utils"

const selectToken = (state) => state?.auth?.user?.token;

export const usersServices = createApi({
    reducerPath: "users_services",
    baseQuery: fetchBaseQuery({
        baseUrl: developmentUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState())
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        // fetch user profile
        fetchUserProfile: builder.query({
            query: () => "/users",
            providesTags: ["Users"],
        }),

        // update user profile
        updateUserProfile: builder.mutation({
            query: (userData) => ({
                url: "/users",
                method: "PATCH",
                body: userData,
            }),
            invalidatesTags: ["Users"],
        }),

        // delete user profile
        deleteUserProfile: builder.mutation({
            query: () => ({
                url: "/users",
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        // change user password
        changePassword: builder.mutation({
            query: (userData) => ({
                url: "/auth/changePassword",
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["Users"],
        }),

        // fetch my posts
        fetchMyPosts: builder.query({
            query: (options) => {
                const queryParams = new URLSearchParams(options);
                return `/users/myPosts?${queryParams.toString()}`;
            },
            providesTags: ["Users"],
        }),

        // delete post
        deleteMyPost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

      

        // change photo
        uploadAvatar: builder.mutation({
            query: (res) => ({
                url: "/users/profilePhoto",
                method: "POST",
                body: res,
            }),
            invalidatesTags: ["Users"],
        }),





    }),
});

export const {
    useFetchUserProfileQuery,
    useUpdateUserProfileMutation,
    useDeleteUserProfileMutation,
    useChangePasswordMutation,
    useFetchMyPostsQuery,
    useUploadAvatarMutation,
    useDeleteMyPostMutation,
} = usersServices;
export default usersServices