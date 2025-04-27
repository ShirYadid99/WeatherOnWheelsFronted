import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// טיפוס נתונים עבור מידע מזג האוויר (כולל זמן, טמפרטורה ולחץ)
type WeatherData = {
  time: string; // זמן מדוד
  temperature: number; // טמפרטורה
  pressure: number; // לחץ
};

// טיפוס פרופס עבור רכיב WeatherChart - קואורדינטות של מקום
type Props = {
  lat: number; // קו רוחב
  lon: number; // קו אורך
};

// רכיב שמציג גרף קו עבור טמפרטורה ולחץ מזג אוויר
const WeatherChart: React.FC<Props> = ({ lat, lon }) => {
  // שמירת נתוני מזג האוויר
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  // שימוש ב-useEffect לשליחה של בקשה ל-API ברגע שהקואורדינטות משתנות
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '24c3fbbee01155c24e008f192239c4f4'; // ה־API key שלך
      // URL עבור שליחת בקשה ל-OpenWeather API
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url); // שליחת הבקשה ל-API
        const data = await response.json(); // המרת התשובה לפורמט JSON

        // בדוק אם הנתונים התקבלו בהצלחה
        console.log(data);  // הדפסת כל הנתונים לצורך ניפוי בעיות

        // יצירת נתונים עבור הגרף מהתשובה שהתקבלה
        const formattedData = [
          {
            time: new Date(data.dt * 1000).toLocaleTimeString(), // המרת זמן UNIX לתאריך קריא
            temperature: data.main.temp, // הטמפרטורה מהתשובה
            pressure: data.main.pressure, // הלחץ מהתשובה
          },
        ];

        // עדכון המצב עם נתוני הגרף המעובדים
        setWeatherData(formattedData);
      } catch (error) {
        // טיפול בשגיאות אם יש בעיה בשליחת הבקשה או קבלת הנתונים
        console.error("Error fetching weather data:", error);
      }
    };

    // ודא שנשלח את הבקשה רק אם יש קואורדינטות
    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]); // בקשה מחודשת בכל פעם שהקואורדינטות משתנות

  return (
    // רכיב ResponsiveContainer שמווסת את גודל הגרף בהתאם למידות המסך
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weatherData}> {/* הגרף עצמו */}
        <CartesianGrid strokeDasharray="3 3" /> {/* רשת של הגרף */}
        <XAxis dataKey="time" /> {/* ציר ה-X - זמן */}
        <YAxis /> {/* ציר ה-Y - ערכים של טמפרטורה ולחץ */}
        <Tooltip /> {/* הצגת מידע נוסף בזמן ריחוף */}
        <Legend /> {/* סמל המפתח */}
        {/* קו שמציג את הטמפרטורה */}
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        {/* קו שמציג את הלחץ */}
        <Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
