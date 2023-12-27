import { useNavigate, useLocation } from 'react-router-dom'
import { getFormValues } from "@/helpers"
import { useSearchBlogQuery } from '@/redux/services/othersServices';

const useSearch = () => {
    const Navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        let { data } = getFormValues(e.currentTarget)
        if (data?.search !== '') {
            // console.log(data);
            Navigate(`/search?query=${encodeURIComponent(data?.search)}`);
        }
    }

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchedQuery = searchParams.get('query');

    var { data: searchData, isLoading, isError, error, isFetching } = useSearchBlogQuery(searchedQuery)

    // console.log(searchedQuery);

    return {
        onSubmit,
        searchedQuery,
        searchData,
        isLoading,
        isError,
        error
    }
};

export default useSearch;
// e.currentTarget?.reset()