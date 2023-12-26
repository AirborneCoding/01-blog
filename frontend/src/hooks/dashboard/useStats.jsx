import { useFetchTotalsQuery } from "@/redux/services/othersServices";

const useStats = () => {
    // Fetch totals
    const {
        data: totals,
        isLoading: TotalsLoader,
        isError: isTotalsError,
        error: totalsError
    } = useFetchTotalsQuery();


    return {
        totals,
        TotalsLoader,
        isTotalsError,
        totalsError,
    };
};

export default useStats;
