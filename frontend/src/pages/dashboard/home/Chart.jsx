import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area,
} from 'recharts';
import { useFetchDataQuery } from '@/redux/services/othersServices';

const UserPostViewsChart = () => {
    const { data: charts, isLoading, error } = useFetchDataQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!charts || charts.length === 0) {
        return <div>No data available</div>;
    }

    const formatMonthName = (month) => {
        const monthNames = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        return monthNames[month - 1]; // Months are 1-indexed in JavaScript Date objects
    };

    // Determine the start month based on the first post's month
    const startMonth = charts.reduce((minMonth, chart) => (chart.month < minMonth ? chart.month : minMonth), charts[0].month);

    // Create an array with data for all months, including zero views for months without data
    const allMonthsData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const chartData = charts.find((chart) => chart.month === month);
        return {
            month,
            totalViews: chartData ? chartData.totalViews : 0,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={allMonthsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={formatMonthName} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="totalViews" fill="#3B3F44" stroke="#3B3F44" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default UserPostViewsChart;