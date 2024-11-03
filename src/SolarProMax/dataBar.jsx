import React, { useState, useEffect } from "react";
import "./dataBar.css";
import axios from "axios";

export default function DataBar({onChange}) {
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
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:3001/data/solarsync");
        setData(response.data);
        onChange(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onChange]);

  return (
    <div className="dataSidebar">
      <h2 id="title">Status</h2>
      <div className="datalist">
        <div id="battery-bar">
          <div id="battery">
            <div id="current-bat" style={{width: `${data.battery_percentage}%`}}></div>
          </div>
          <label>{data.battery_percentage}%</label>
        </div>
        <label>{data.Voltage >= 2 ? "charging" : "not charging"}</label>
        <p>
          Solar Voltage : <span>{data.Voltage?.toFixed(2)}</span>
        </p>
        <p>
          Solar Current : <span>{data.Current?.toFixed(2)}</span>
        </p>
        <p>
          Solar Watt : <span>{data.watt?.toFixed(2)}</span>
        </p>
        <p>
          LDR Right : <span>{data.LDR_RIG?.toFixed(2)}</span>
        </p>
        <p>
          LDR Left : <span>{data.LDR_LEF?.toFixed(2)}</span>
        </p>
        <p>
          LDR Top : <span>{data.LDR_TOP?.toFixed(2)}</span>
        </p>
        <p>
          LDR Bottom : <span>{data.LDR_BOT?.toFixed(2)}</span>
        </p>
        <p>
          angle : <span>{data.angle?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
