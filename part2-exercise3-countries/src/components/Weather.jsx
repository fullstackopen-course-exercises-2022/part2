import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState({});
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: props?.country?.capital[0],
                appid: API_KEY
            }
        }).then((response) => {
            setWeatherData(response?.data);
        }).catch(error => console.log(error));
    }, [])
    console.log(weatherData);
    const icon = weatherData?.weather?.map(i => i?.icon);
    return (
        <div>
            <h2>{props?.country?.capital[0]} current weather</h2>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" width="100" height="100" />
            <p>Weather: {weatherData?.main?.temp}</p>
        </div>
    );
}

export default Weather;