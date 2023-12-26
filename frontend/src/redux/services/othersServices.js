import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { developmentUrl } from "@/utils"

const selectToken = (state) => state?.auth?.user?.token;

export const otherServices = createApi({
    reducerPath: "other_services",
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
    tagTypes: ["OtherServices"],
    endpoints: (builder) => ({
        // fetch top 5 
        fetchTop5: builder.query({
            query: () => '/others/top5',
        }),

        // search blog
        searchBlog: builder.query({
            query: (query) => `/others/search?q=${query}`,
        }),

        // fetch totals
        fetchTotals: builder.query({
            query: () => {
                return `/others/totals`;
            },
            providesTags: ["Users"],
        }),
        // fetch data
        fetchData: builder.query({
            query: () => {
                return `/others/data?aggregationType`;
            },
            providesTags: ["Users"],
        }),

    }),
});

export const {
    useFetchTop5Query,
    useSearchBlogQuery,
    useFetchTotalsQuery,
    useFetchDataQuery
} = otherServices;
export default otherServices