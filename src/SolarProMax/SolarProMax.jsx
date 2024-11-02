import React from 'react';
import './SolarProMax.css';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import DataBar from './dataBar.jsx';

export default function SolarProMax() {
    document.title = 'SolarProMax';
    return (
        <>
        <Navbar isTokenValid={true} />
        <div className='bg'>
            <div className="banner"></div>
            <Sidebar isTokenValid={true}/>
            <DataBar />
            <div className='solar'>
                <h1 id='solar-title'>Solar Cell</h1>
                <div id='visual-solar'>
                    <div id='square'></div>
                    <div id='pole-vertical'></div>
                    <div id='pole-horizontal'></div>
                    <div id='status-ldr-right'></div>
                    <div id='status-ldr-left'></div>
                    <div id='status-ldr-top'></div>
                    <div id='status-ldr-bottom'></div>
                    <div id='status-servo-center'></div>
                    <div id='status-servo-bottom'></div>
                </div>
            </div>
        </div>
        </>
    );
}