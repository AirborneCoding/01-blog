import { useGetCategoriesQuery } from "@/redux/services/categoryServices";

const useCategory = () => {
    const { data: categories, isError: categoriesError, isLoading: categoriesLoading, isSuccess: categoriesSuccess } = useGetCategoriesQuery();
    

    return {
        categories,
        categoriesError,
        categoriesLoading,
        categoriesSuccess,
    };
};

export default useCategory;
