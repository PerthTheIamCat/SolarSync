import React, { useState, useEffect } from "react";
import "./dataBar.css";
import axios from "axios";

export default function DataBar() {
  const [data, setData] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:3001/data");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dataSidebar">
      <h2 id="title">Status</h2>
      <div className="datalist">
        <div id="battery-bar">
          <div id="battery">
            <div id="current-bat" style={{width: data.battery_percentage}}></div>
          </div>
          <label>{data.battery_percentage}%</label>
        </div>
        <label>not charging</label>
        <p>
          Solar Voltage : <span>{data.Voltage}</span>
        </p>
        <p>
          Solar Current : <span>{data.Current}</span>
        </p>
        <p>
          Solar Watt : <span>{data.watt}</span>
        </p>
        <p>
          LDR Right : <span>{data.LDR_RIG}</span>
        </p>
        <p>
          LDR Left : <span>{data.LDR_LEF}</span>
        </p>
        <p>
          LDR Top : <span>{data.LDR_TOP}</span>
        </p>
        <p>
          LDR Bottom : <span>{data.LDR_BOT}</span>
        </p>
        <p>
          angle : <span>{data.angle}</span>
        </p>
      </div>
    </div>
  );
}
