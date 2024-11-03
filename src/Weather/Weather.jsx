import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './Weather.css';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    // Maximum data points to display on the chart
    const maxDataPoints = 20;

    // Fetch data from API every second
    useEffect(() => {
        const fetchData = async () => {
            axios.get('http://localhost:3001/data/weather')
                .then(response => {
                    const data = response.data;
                    setWeatherData(prevData => ({
                        Temperature: [...prevData.Temperature, data.Temperature].slice(-maxDataPoints),
                        Humidity: [...prevData.Humidity, data.Humidity].slice(-maxDataPoints),
                        Pressure: [...prevData.Pressure, data.Pressure].slice(-maxDataPoints),
                        HeatIndex: [...prevData.HeatIndex, data.HeatIndex].slice(-maxDataPoints),
                        DewPoint: [...prevData.DewPoint, data.DewPoint].slice(-maxDataPoints),
                        RainRate: [...prevData.RainRate, data.RainRate].slice(-maxDataPoints)
                    }));
                    if (weatherData.RainRate >= 60) {
                        const lastSentTime = localStorage.getItem('lastSentTime');
                        const currentTime = new Date().getTime();
                        
                        if (!lastSentTime || currentTime - lastSentTime > 3600000) { // 3600000 ms = 1 hour
                            const sendEmail = async () => {
                                const response = await axios.get('http://localhost:3001/user', {
                                    headers: {
                                        Authorization: `${localStorage.getItem('token')}`
                                    }
                                });
                                if (response.data.email && response.data.isNotiEnabled) {
                                    await emailjs.send('service_btq6qg9', 'template_0l72ebn', {
                                        name: response.data.username,
                                        reply_to: response.data.email,
                                        RainRate: weatherData.RainRate,
                                        email : response.data.email
                                    }, 'Ff_Au8ZHm82n1G0Y9')
                                    .then((result) => {
                                        console.log('Email sent:', result.text);
                                        localStorage.setItem('lastSentTime', currentTime);
                                    })
                                    .catch((error) => {
                                        console.error('Email sending error:', error);
                                    });
                                }
                            };
                            sendEmail();
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        };

        fetchData(); // Fetch data immediately on mount
        const intervalId = setInterval(fetchData, 1000); // Fetch data every 1 second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    // Chart configuration
    const chartData = (label, data) => ({
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [
            {
                label: label,
                data: data,
                fill: false,
                backgroundColor: 'rgba(3, 169, 244, 0.6)',
                borderColor: 'rgba(3, 169, 244, 1)',
                tension: 0.4 // Adds a smooth curve to the line chart
            }
        ]
    });
    const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigate("/"); 
    };

    return (
        <>
            <Sidebar isTokenValid={true} />
            <div className='bg relative'>
                <Navbar isTokenValid={true} handleLogout={handleLogout}/>
                <div className="banner"></div>
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