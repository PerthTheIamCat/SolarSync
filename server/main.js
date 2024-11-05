const mqtt = require('mqtt');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3zma22x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

const brokerUrl = 'mqtt://20.205.129.163';
const brokerUrl2 = 'mqtt://20.205.137.214';
const mqttClient = mqtt.connect(brokerUrl);
const mqttClient2 = mqtt.connect(brokerUrl2);
// SolarSync
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

// Weather
var temperature = 0;
var humidity = 0;
var pressure = 0;
var heat_index = 0;
var dew_point = 0;
var rain_rate = 0;
var altitude = 0;

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
    await mongo_client.connect();
    await mongo_client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
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

async function insertUser(client, newUser) {
  await client.connect();
  const result = await client.db("SolarSync").collection("user").insertOne(newUser);
  console.log(`New user created with the following id: ${result.insertedId}`);
  return result;
}

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
      angle = Obj.Angle || 0;
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

mqttClient2.on('message', (topic, message) => {
  if (topic === '/WeatherReport') {
    try {
      const Obj = JSON.parse(message.toString());
      temperature = Obj.Temperature || 0;
      humidity = Obj.DHT22.Humidity || 0;
      pressure = Obj.BMP280.Pressure || 0;
      heat_index = Obj.HeatIndex || 0;
      dew_point = Obj.DewPoint || 0;
      rain_rate = Obj.RainProbability || 0;
      altitude = Obj.BMP280.Altitude || 0;

      console.log('Weather report:', Obj);
    } catch (error) {
      console.log('Error parsing JSON:', error);
    }
  }
});

mqttClient2.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient2.subscribe('/WeatherReport', (err) => {
    if (!err) {
      console.log('Subscribed to topic /WeatherReport');
    }
  });
});

const SECRET_KEY = process.env.SECRET_KEY;

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user) {
    res.status(400).send('this email already been used');
  } else {
    const newUser = { _id: new ObjectId(), email:email, password:password, img:"", username:"", birthday:"", isNotiEnabled: false };
    console.log("new user: "+email+" register");
    users.push(newUser);
    insertUser(mongo_client, newUser).catch(console.dir);
    res.json(newUser);
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  console.log("user: "+email+" try to login");
  if (user) {
    const token = jwt.sign({ userId: user._id}, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/user', (req, res) => {
  const token = req.headers['authorization'];
  console.log("user try to get data");
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    console.log(decoded);
    console.log("user: "+decoded.userId+" get data");
    const user = users.find(u => u._id.equals(new ObjectId(decoded.userId)));
    console.log(user);
    res.json({ email: user.email, username: user.username, birthday: user.birthday, img: user.img, isNotiEnabled: user.isNotiEnabled });
  });
});

app.put('/user', (req, res) => {
  const token = req.headers['authorization'];
  const { username, birthday, img } = req.body;
  console.log("user try update data");
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    console.log(decoded);
    console.log("user: "+decoded.userId+" get data");
    await mongo_client.connect();
    const result = await mongo_client.db("SolarSync").collection("user").updateOne({ _id: new ObjectId(decoded.userId) }, { $set: { username: username, birthday: birthday, img: img } });
    getUser(mongo_client).catch(console.dir);
    res.json(result);
  });
});

app.put('/password', (req, res) => {
  const token = req.headers['authorization'];
  const { password } = req.body;
  console.log("user try to update password");
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    console.log(decoded);
    console.log("user: "+decoded.userId+" update password");
    try {
      await mongo_client.connect();
      const result = await mongo_client.db("SolarSync").collection("user").updateOne({ _id: new ObjectId(decoded.userId) }, { $set: { password: password } });
      getUser(mongo_client).catch(console.dir);
      res.json(result);
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post('/sendotp', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');
  
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    
    try {
      const user = users.find(u => u._id.equals(new ObjectId(decoded.userId)));
      if (!user) {
        return res.status(404).send('User not found');
      }
      let otp = '';
      const characters = '0123456789';
      for (let i = 0; i < 6; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      await mongo_client.connect();
      const otpCollection = mongo_client.db("SolarSync").collection("OTP");
      const existingOTP = await otpCollection.findOne({ _id: user.email });
      if (existingOTP) {
        await otpCollection.updateOne({ _id: user.email }, { $set: { otp: otp } });
      } else {
        await otpCollection.insertOne({ _id: user.email, otp: otp });
      }
      res.json({ otp: otp , email: user.email});
    } catch (error) {
      console.error('Error generating OTP:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post('/verifyotp', async (req, res) => {
  const token = req.headers['authorization'];
  const { otp } = req.body;
  if (!token) return res.status(403).send('Token is required');
  
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    
    try {
      const user = users.find(u => u._id.equals(new ObjectId(decoded.userId)));
      if (!user) {
        return res.status(404).send('User not found');
      }
      await mongo_client.connect();
      const otpCollection = mongo_client.db("SolarSync").collection("OTP");
      const existingOTP = await otpCollection.findOne({ _id: user.email });
      if (existingOTP && existingOTP.otp === otp) {
        res.json({ status: 'success' });
      } else {
        res.status(401).send('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post("/notification/toggle",async (req, res) => {
  const isNotiEnabled = req.body.isNotiEnabled;
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    console.log(decoded);
    console.log("user: "+decoded.userId+" toggle notification");
    try {
      await mongo_client.connect();
      await mongo_client.db("SolarSync").collection("user").updateOne({ _id: new ObjectId(decoded.userId) }, { $set: { isNotiEnabled: isNotiEnabled } });
      getUser(mongo_client).catch(console.dir);
    } catch (error) {
      console.error('Error toggling notification:', error);
      res.status(500).send('Internal Server Error');
    }
    res.json({ status: 'success' });
  });
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/data/solarsync', (req, res) => {
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

app.get('/data/weather', (req, res) => {
  res.json({
    Temperature: temperature,
    Humidity: humidity,
    Pressure: pressure,
    HeatIndex: heat_index,
    DewPoint: dew_point,
    RainRate: rain_rate,
    Altitude: altitude
  });
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});