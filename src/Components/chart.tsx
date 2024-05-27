import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary chart elements and plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Define the data types for the charts
interface LineChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill?: boolean;
        backgroundColor: string;
        borderColor?: string;
    }[];
}

interface PieChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
}

interface BarChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

const Chart: React.FC = () => {
    // State to store chart data
    const [lineChartData, setLineChartData] = useState<LineChartData | null>(null);
    const [pieChartData, setPieChartData] = useState<PieChartData | null>(null);
    const [barChartData, setBarChartData] = useState<BarChartData | null>(null);

    // Fetch historical and current data
    useEffect(() => {
        fetchHistoricalData();
        fetchCurrentData();
    }, []);

    // Fetch historical data for cases fluctuations
    const fetchHistoricalData = async () => {
        try {
            const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
            const data = await response.json();

            const dates = Object.keys(data.cases);
            const cases = Object.values(data.cases) as number[];

            setLineChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Cases Fluctuations',
                        data: cases,
                        fill: false,
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching historical data', error);
        }
    };

    // Fetch current data for pie and bar charts
    const fetchCurrentData = async () => {
        try {
            const response = await fetch('https://disease.sh/v3/covid-19/all');
            const data = await response.json();

            setPieChartData({
                labels: ['Active Cases', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        data: [data.active, data.recovered, data.deaths],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                ],
            });

            setBarChartData({
                labels: ['Total Cases', 'Total Deaths', 'Total Recovered', 'Total Tests', 'Active Cases', 'Critical Cases'],
                datasets: [
                    {
                        label: 'Count',
                        data: [data.cases, data.deaths, data.recovered, data.tests, data.active, data.critical],
                        backgroundColor: '#36A2EB',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching current data', error);
        }
    };

    return (
        <div className='flex flex-col items-center gap-5 p-5'>
            {/* Line Chart Component */}
            <div className='w-full md:w-2/3 lg:w-1/2 border p-3'>
                <h2>Cases Fluctuations</h2>
                {lineChartData && (
                    <Line data={lineChartData} />
                )}
            </div>
            {/* Pie and Bar Charts Component */}
            <div className='w-full md:w-2/3 lg:w-1/2 border p-3'>
                <h2>Current COVID-19 Data</h2>
                <div className='flex flex-col md:flex-row justify-around'>
                    <div className='w-full md:w-1/2'>
                        <h3>Overall Distribution</h3>
                        {pieChartData && (
                            <Pie data={pieChartData} />
                        )}
                    </div>
                    <div className='w-full md:w-1/2 mt-4 md:mt-0'>
                        <h3>Summary Statistics</h3>
                        {barChartData && (
                            <Bar data={barChartData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;
