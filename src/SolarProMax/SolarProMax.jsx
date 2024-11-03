import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./SolarProMax.css";
import Navbar from "../Navbar/Navbar.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import DataBar from "./dataBar.jsx";
import axios from "axios";

Chart.register(...registerables);

export default function SolarProMax() {
  document.title = "SolarProMax";
  const [solarData, setSolarData] = useState({
    chart_battery_percentage: [],
    chart_Voltage: [],
    chart_Current: [],
    chart_watt: [],
    chart_LDR_RIG: [],
    chart_LDR_LEF: [],
    chart_LDR_TOP: [],
    chart_LDR_BOT: [],
    chart_angle: [],
  });

  // Maximum data points to display on the chart
  const maxDataPoints = 20;

  // Fetch data from API every second
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3001/data/solarsync")
        .then((response) => {
          const data = response.data;
          setSolarData((prevData) => ({
            chart_battery_percentage: [
              ...prevData.chart_battery_percentage,
              data.battery_percentage,
            ].slice(-maxDataPoints),
            chart_Voltage: [...prevData.chart_Voltage, data.Voltage].slice(
              -maxDataPoints
            ),
            chart_Current: [...prevData.chart_Current, data.Current].slice(
              -maxDataPoints
            ),
            chart_watt: [...prevData.chart_watt, data.watt].slice(
              -maxDataPoints
            ),
            chart_LDR_RIG: [...prevData.chart_LDR_RIG, data.LDR_RIG].slice(
              -maxDataPoints
            ),
            chart_LDR_LEF: [...prevData.chart_LDR_LEF, data.LDR_LEF].slice(
              -maxDataPoints
            ),
            chart_LDR_TOP: [...prevData.chart_LDR_TOP, data.LDR_TOP].slice(
              -maxDataPoints
            ),
            chart_LDR_BOT: [...prevData.chart_LDR_BOT, data.LDR_BOT].slice(
              -maxDataPoints
            ),
            chart_angle: [...prevData.chart_angle, data.angle].slice(
              -maxDataPoints
            ),
          }));
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
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
        backgroundColor: "rgba(3, 169, 244, 0.6)",
        borderColor: "rgba(3, 169, 244, 1)",
        tension: 0.4, // Adds a smooth curve to the line chart
      },
    ],
  });

  const [data, setData] = useState({
    battery_percentage: 0,
    Voltage: 0,
    Current: 0,
    watt: 0,
    LDR_RIG: 0,
    LDR_LEF: 0,
    LDR_TOP: 0,
    LDR_BOT: 0,
    angle: 0,
  });
  const onChange = (data) => {
    setData(data);
    console.log(data);
  };

  return (
    <>
      
      <Sidebar isTokenValid={true} />
      <DataBar onChange={onChange} />
      <div className="bg relative">
        <Navbar isTokenValid={true} />
        <div className="banner"></div>
        <div className="solar">
          <h1 id="solar-title">Solar Cell</h1>
          <div id="visual-solar">
            <div id="square"></div>
            <div id="pole-vertical"></div>
            <div id="pole-horizontal"></div>
            <div
              id="status-ldr-right"
              className={data.LDR_RIG ? `green` : `red`}
            ></div>
            <div
              id="status-ldr-left"
              className={data.LDR_LEF ? `green` : `red`}
            ></div>
            <div
              id="status-ldr-top"
              className={data.LDR_TOP ? `green` : `red`}
            ></div>
            <div
              id="status-ldr-bottom"
              className={data.LDR_BOT ? `green` : `red`}
            ></div>
            <div id="status-servo-center" className={`green`}></div>
            <div id="status-servo-bottom" className={`red`}></div>
          </div>
        </div>
        <div className="charts-solar">
          <div className="chart">
            <h2>Battery Percentage</h2>
            <Line
              data={chartData(
                "battery_percentage",
                solarData.chart_battery_percentage
              )}
            />
          </div>
          <div className="chart">
            <h2>Voltage</h2>
            <Line data={chartData("Voltage", solarData.chart_Voltage)} />
          </div>
          <div className="chart">
            <h2>Current</h2>
            <Line data={chartData("Current", solarData.chart_Current)} />
          </div>
          <div className="chart">
            <h2>Watt</h2>
            <Line data={chartData("watt", solarData.chart_watt)} />
          </div>
          <div className="chart">
            <h2>LDR_RIG</h2>
            <Line data={chartData("LDR_RIG", solarData.chart_LDR_RIG)} />
          </div>
          <div className="chart">
            <h2>LDR_LEF</h2>
            <Line data={chartData("LDR_LEF", solarData.chart_LDR_LEF)} />
          </div>
          <div className="chart">
            <h2>LDR_TOP</h2>
            <Line data={chartData("LDR_TOP", solarData.chart_LDR_TOP)} />
          </div>
          <div className="chart">
            <h2>LDR_BOT</h2>
            <Line data={chartData("LDR_BOT", solarData.chart_LDR_BOT)} />
          </div>
          <div className="chart">
            <h2>Angle</h2>
            <Line data={chartData("angle", solarData.chart_angle)} />
          </div>
        </div>
      </div>
    </>
  );
}
