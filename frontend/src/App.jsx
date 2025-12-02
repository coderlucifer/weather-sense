import { useState } from "react";
import axios from "axios";

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchWeather = async () => {
    if (!lat || !lon || !start || !end) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://express-weather-api.vercel.app/weather`,
        { params: { lat, lon, start, end } }
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Data Fetcher</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Latitude"
            value={lat}
            onChange={e => setLat(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            placeholder="Longitude"
            value={lon}
            onChange={e => setLon(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={start}
            onChange={e => setStart(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={end}
            onChange={e => setEnd(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button 
          onClick={fetchWeather}
          className="w-full bg-blue-600 text-black p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Fetch Weather
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <h2 className="text-center text-lg font-semibold">Loading...</h2>
      )}

      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {data.map(d => (
          <div key={d.date} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">{d.date}</h3>

            <p><strong>Temperature:</strong> {d.temperature_2m?.toFixed(2)}°C</p>
            <p><strong>Humidity:</strong> {d.relative_humidity_2m?.toFixed(2)}%</p>
            <p><strong>Precipitation:</strong> {d.precipitation?.toFixed(2)} mm</p>
            <p><strong>Soil Moisture:</strong> {d.soil_moisture_1_to_3cm ?? "No data"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
