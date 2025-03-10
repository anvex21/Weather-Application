document.getElementById("submit").addEventListener("click", async () => {
  const city = document.getElementById("search").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await axios.get("/weather", {
      params: { city },
    });

    const data = response.data;

    document.getElementById("weatherInfo").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Error fetching data", error);
    document.getElementById("weatherInfo").innerHTML = `
      <p style="color: red;">City not found. Try again!</p>
    `;
  }
});
