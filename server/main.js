const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const brokerUrl = 'mqtt://20.205.129.163'; // IP ของ VM Azure
const mqttClient = mqtt.connect(brokerUrl);

var LDR_TOP = 0;
var LDR_BOT = 0;
var LDR_RIG = 0;
var LDR_LEF = 0;
var voltage = 0;
var current = 0;
var angle = 0;
var watt = 0;
var battery_percentage = 0;
var battery_voltage = 0;

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe('ESP32_SolarSync', (err) => {
    if (!err) {
      console.log('Subscribed to topic ESP32_SolarSync');
    }
  });
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'ESP32_SolarSync') {
    try {
      const Obj = JSON.parse(message.toString());
      LDR_TOP = Obj.LDR_TOP || 0;
      LDR_BOT = Obj.LDR_BOT || 0;
      LDR_RIG = Obj.LDR_RIG || 0;
      LDR_LEF = Obj.LDR_LEF || 0;
      voltage = Obj.Voltage || 0;
      current = Obj.Current || 0;
      angle = Obj.angle || 0;
      battery_percentage = Obj.battery_percentage || 0;
      battery_voltage = Obj.battery_voltage || 0;
      watt = voltage * current;
      
      console.log('Data updated:', {
        LDR_TOP, LDR_BOT, LDR_RIG, LDR_LEF, voltage, current, angle, watt, battery_percentage, battery_voltage
      });
    } catch (error) {
      console.log('Error parsing JSON:', error);
    }
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/data', (req, res) => {
  res.json({
    LDR_TOP: LDR_TOP,
    LDR_BOT: LDR_BOT,
    LDR_RIG: LDR_RIG,
    LDR_LEF: LDR_LEF,
    Voltage: voltage,
    Current: current,
    angle: angle,
    watt: watt,
    battery_percentage: battery_percentage,
    battery_voltage: battery_voltage
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});