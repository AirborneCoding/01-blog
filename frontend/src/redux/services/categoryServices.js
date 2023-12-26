import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { developmentUrl } from '../../utils';

const selectToken = (state) => state?.auth?.user?.token;

export const categoryServices = createApi({
    reducerPath: 'categories_services',
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

    endpoints: (builder) => ({
        // fetch caterories
        getCategories: builder.query({
            query: () => '/categories',
        }),

        // create categories
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/categories',
                method: 'POST',
                body: newCategory,
            }),
        }),
    
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,

} = categoryServices;

export default categoryServices;