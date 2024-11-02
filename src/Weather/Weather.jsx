import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './Weather.css';

Chart.register(...registerables);

export default function Weather() {
    const [weatherData, setWeatherData] = useState({
        Temperature: [],
        Humidity: [],
        Pressure: [],
        HeatIndex: [],
        DewPoint: [],
        RainRate: []
    });
    const [chartKey, setChartKey] = useState(0);

    // ดึงข้อมูลจาก API เมื่อโหลดหน้า
    useEffect(() => {
        fetch('/data/weather')
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                setChartKey(prevKey => prevKey + 1); // อัปเดต key
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // กรณีที่ดึงข้อมูลไม่สำเร็จให้ตั้งค่าข้อมูลจำลอง
                const mockData = {
                    Temperature: [22, 23, 24, 25, 26, 27],
                    Humidity: [45, 50, 55, 60, 65, 70],
                    Pressure: [1012, 1013, 1014, 1015, 1016, 1017],
                    HeatIndex: [25, 26, 27, 28, 29, 30],
                    DewPoint: [10, 11, 12, 13, 14, 15],
                    RainRate: [0, 1, 2, 3, 4, 5],
                };
                setWeatherData(mockData); // ตั้งค่า mock data
            });
    }, []);


    // ตั้งค่าข้อมูลสำหรับกราฟ
    const chartData = (label, data) => ({
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [
            {
                label: label,
                data: data,
                fill: false,
                backgroundColor: 'rgba(3, 169, 244, 0.6)',
                borderColor: 'rgba(3, 169, 244, 1)',
            }
        ]
    });

    return (
        <>
            <Navbar isTokenValid={true} />
            <div className="banner"></div>
            <Sidebar isTokenValid={true} /> 
            <div className='bg'>
                <div className='content'>
                    <h1 id='weather-title'>Weather Dashboard</h1>

                    <div className='charts'>
                        <div className='chart'>
                            <h2>Temperature</h2>
                            <Line data={chartData("Temperature", weatherData.Temperature)} />
                        </div>
                        <div className='chart'>
                            <h2>Humidity</h2>
                            <Line data={chartData("Humidity", weatherData.Humidity)} />
                        </div>
                        <div className='chart'>
                            <h2>Pressure</h2>
                            <Line data={chartData("Pressure", weatherData.Pressure)} />
                        </div>
                        <div className='chart'>
                            <h2>Heat Index</h2>
                            <Line data={chartData("Heat Index", weatherData.HeatIndex)} />
                        </div>
                        <div className='chart'>
                            <h2>Dew Point</h2>
                            <Line data={chartData("Dew Point", weatherData.DewPoint)} />
                        </div>
                        <div className='chart'>
                            <h2>Rain Rate</h2>
                            <Line data={chartData("Rain Rate", weatherData.RainRate)} />
                        </div>
                    </div>
                </div>    
            </div>
        </>
    );
}