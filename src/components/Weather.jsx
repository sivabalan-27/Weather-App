import React,{ useEffect, useRef, useState} from 'react'
import axios from "axios";
import search_icon from '../assets/search.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import cloud from '../assets/cloud.png'
import clear from '../assets/clear.png'
import dizzy from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import './Weather.css'

const Weather = () => {

  const [weatherData, setWeatherData] = useState("");
  const [ loading, setLoading] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04n": dizzy,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": dizzy,
    "11n": dizzy,
    "13d": snow,
    "13n": snow,
    "50d": cloud,
    "50n": cloud
  }

  const search = async (city) => {
  
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
  
      const response = await axios.get(url); // axios request
      setLoading(false);
  
      const data = response.data; 
  
      const icons = allIcons[data.weather[0].icon] || clear;
  
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: (data.wind.speed ), 
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icons,
      });
    } catch (error) {
      setLoading(false);
      setWeatherData(null);
    }
  };
  

  useEffect(() => {
    search("New York");

  },[])

  return (
    <div className="weather">
      <div className="searchbar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div> 
      </div>
      </>:<>
        <h3 className='unkown'>Enter a Valid City Name</h3>
      </>}
      
    </div>
  )
}

export default Weather
