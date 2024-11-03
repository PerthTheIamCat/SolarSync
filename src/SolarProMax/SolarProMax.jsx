import React, { useState } from 'react';
import './SolarProMax.css';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import DataBar from './dataBar.jsx';

export default function SolarProMax() {
    document.title = 'SolarProMax';
    const [data, setData] = useState({
        battery_percentage: 0,
        Voltage: 0,
        Current: 0,
        watt: 0,
        LDR_RIG: 0,
        LDR_LEF: 0,
        LDR_TOP: 0,
        LDR_BOT: 0,
        angle: 0
    });
    const onChange = (data) => {
        setData(data);
        console.log(data);
    }

    return (
        <>
        <Navbar isTokenValid={true} />
        <div className='bg'>
            <div className="banner"></div>
            <Sidebar isTokenValid={true}/>
            <DataBar onChange={onChange} />
            <div className='solar'>
                <h1 id='solar-title'>Solar Cell</h1>
                <div id='visual-solar'>
                    <div id='square'></div>
                    <div id='pole-vertical'></div>
                    <div id='pole-horizontal'></div>
                    <div id='status-ldr-right' className={data.LDR_RIG ? `green` : `red`}></div>
                    <div id='status-ldr-left' className={data.LDR_LEF ? `green` : `red`}></div>
                    <div id='status-ldr-top' className={data.LDR_TOP ? `green` : `red`}></div>
                    <div id='status-ldr-bottom' className={data.LDR_BOT ? `green` : `red`}></div>
                    <div id='status-servo-center' className={`green`}></div>
                    <div id='status-servo-bottom' className={`red`}></div>
                </div>
            </div>
        </div>
        </>
    );
}