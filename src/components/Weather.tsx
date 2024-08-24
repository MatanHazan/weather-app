import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useButtonStyles } from '../App';

const OPENWEATHER_API_KEY = '9a22785104fcaa8daebcb38ac8551f8c';
const WEATHERAPI_API_KEY = '3998424261db44daba275934241508';

const OPEN_WEATHER_LABEL = 'OpenWeather';
const WEATHER_API_LABEL = 'WeatherAPI';
const OPEN_METEO_LABEL = 'Open-Meteo';

const fetchWeather = async (city: string) => {
  const cityCoordinatesForMeteo = await getCoordinates(city);
  const [openWeather, weatherApi, openMeteo] = await Promise.all([
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${OPENWEATHER_API_KEY}`),
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_API_KEY}&q=${city}`),
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinatesForMeteo.latitude}&longitude=${cityCoordinatesForMeteo.longitude}&current=temperature_2m`),
  ]);

  return [openWeather.data, weatherApi.data, openMeteo.data];
};

async function getCoordinates(city: string): Promise<{ latitude: number, longitude: number }> {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const data = await response.json();
    const location = data.results[0];
    return {
        latitude: location.latitude,
        longitude: location.longitude
    };
}

const Weather: React.FC = () => {  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const city: string = searchParams.get('city') as string;

  const textStyle: React.CSSProperties = {
    fontSize: '16px',
    margin: 'auto',
    marginBottom: '16px',
    marginTop: '48px',
    padding: '4px',
    textAlign:'center',
  }

  const buttonStyle = useButtonStyles();

  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
  });

  if (isLoading) return <div style={textStyle}>Loading...</div>;
  if (error) return <div style={textStyle}>Error fetching weather data</div>;

  const openWeatherTempC = data?.[0]?.main?.temp && data[0].main.temp;
  const weatherApiTempC = data?.[1]?.current?.temp_c && data[1].current.temp_c;
  const openMeteoTempC = data?.[2]?.current?.temperature_2m && data[2].current.temperature_2m;

  return (
    <div>
      <div style={textStyle}>
        <h2>Temperature in {city} today:</h2>
        <p>{OPEN_WEATHER_LABEL}: {openWeatherTempC}°C</p>
        <p>{WEATHER_API_LABEL}: {weatherApiTempC}°C</p>
        <p>{OPEN_METEO_LABEL}: {openMeteoTempC}°C</p>
      </div>
      <button style={buttonStyle} onClick={() => navigate('/search')}>New Search</button>
    </div>
  );
};

export default Weather;
