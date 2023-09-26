import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './WeatherCard';
const Temperature = () => {
    const [searchValue,setSearchValue]=useState('Mumbai');
    const [tempInfo,setTempInfo]=useState({})

    const getWeatherInfo=async()=>{
     try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=Metric&appid=890b8ac7a189146314df515242e35cb4`;
        const res= await fetch(url);
        const data = await res.json();
        const {temp,humidity,pressure}=data.main
        const {main:weathermood}=data.weather[0]
        const {name}=data;
        const {speed}=data.wind;
        const {country,sunset}=data.sys;

        const myNewWeather={
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset
        };
        setTempInfo(myNewWeather)
     } catch (error) {
        console.log(error);
     }
    }
    
    useEffect(()=>{
    getWeatherInfo();
    },[])


    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type='search' placeholder='search..' autoFocus className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                    <button className='searchButton' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            {/* Our Temperature card  */}
            <WeatherCard {...tempInfo}/>
            
        </>
    )
}

export default Temperature