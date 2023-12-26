import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { developmentUrl } from '@/utils';

const authorsServices = createApi({
    reducerPath: 'authors_services',
    baseQuery: fetchBaseQuery({ baseUrl: developmentUrl }),
    endpoints: (builder) => ({
        fetchAuthors: builder.query({
            query: () => '/others/authors',
        }),
        // fetch author profile for users
        getAuthorProfile: builder.query({
            query: ({ id }) => `/users/${id}`,
            providesTags: ["Author"],
        }),

        // fetch author posts
        fethAuthorPosts: builder.query({
            query: ({ id }) => `/users/authorPosts/${id}`,
            providesTags: ["Author"],
        }),
    }),
});

export const { useFetchAuthorsQuery, useGetAuthorProfileQuery, useFethAuthorPostsQuery } = authorsServices;

export default authorsServices;
