import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type WeatherData = {
  time: string;
  temperature: number;
  pressure: number;
};

type Props = {
  lat: number;
  lon: number;
};

const WeatherChart: React.FC<Props> = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '24c3fbbee01155c24e008f192239c4f4'; // ה־API key שלך
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // בדוק אם הנתונים התקבלו נכון
        console.log(data);  // הדפסת כל הנתונים

        // צור את נתוני הגרף על בסיס הנתונים המתקבלים
        const formattedData = [
          {
            time: new Date(data.dt * 1000).toLocaleTimeString(),
            temperature: data.main.temp,
            pressure: data.main.pressure,
          },
        ];

        setWeatherData(formattedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // ודא שנשלח את הבקשה רק אם יש קואורדינטות
    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weatherData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
