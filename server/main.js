const mqtt = require('mqtt');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3zma22x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

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

const mongo_client = new MongoClient(MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

var users = [];

async function connect_mongodb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongo_client.connect();
    // Send a ping to confirm a successful connection
    await mongo_client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongo_client.close();
  }
}
connect_mongodb().catch(console.dir);

async function getUser(client) {
  const result = await client.db("SolarSync").collection("user").find().toArray();
  if (result.length > 0) {
    console.log(result);
    users = result;
    return result;
  } else {
    return null;
  }
}
getUser(mongo_client).catch(console.dir);

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
        LDR_TOP, LDR_BOT, LDR_RIG, LDR_LEF, voltage, current, angle, watt, battery_percentage, battery_voltage,
      });
    } catch (error) {
      console.log('Error parsing JSON:', error);
    }
  }
});


const SECRET_KEY = 'secret-key';

// Route สำหรับ login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Route สำหรับทดสอบ token
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    res.json({ message: 'Protected content', userId: decoded.userId });
  });
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