const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();  

const app = express();
const port = 3000;


app.use(express.static('public'));


const apiKey = process.env.API_KEY; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

app.get('/weather', async (req, res) => {
  const { city } = req.query; 

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    res.json(response.data); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
