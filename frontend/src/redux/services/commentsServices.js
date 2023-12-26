import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { developmentUrl } from "../../utils"


const selectToken = (state) => state?.auth?.user?.token;

export const commentsServices = createApi({
    reducerPath: "comments_services",
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
    tagTypes: ["Comments"],
    endpoints: (builder) => ({

        // fetch all post comments with filtered options
        fetchPostComments: builder.query({
            query: ({ postId, options }) => {
                const queryParams = new URLSearchParams(options);
                return `/comments/${postId}?${queryParams.toString()}`;
            },
            providesTags: (result, error, { postId }) => [{ type: "Comments", postId }],
        }),

        // add a comment mutation
        addComment: builder.mutation({
            query: (body) => ({
                url: `/comments/${body.postId}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["Comments"],
        }),

        // delete comment
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `/comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comments"],
        }),

    }),
});

export const {
    useFetchPostCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = commentsServices;
export default commentsServices