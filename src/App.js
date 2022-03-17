import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState("")
  // const [geo, setGeo] = useState({})
  const [data, setData] = useState({
    location: '',
    weather: '',
    wimage: '',
    time: ''
  })

  // const apikey = 'e6de6f6ee382b127ccb8ae0283131bba';

  // const apikey = 'afd1d062b6dbf17543bdf1a48c49b037';

  // function getWeather(lat, lon) {
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
  //   .then((response) => {
  //     setData(response.data)
  //     console.log(response.data)
  //   })
  //   console.log(lat,lon)
  // }

  const handleClick = () => {
    // axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${apikey}`)
    axios.get(`http://api.weatherstack.com/current?access_key=afd1d062b6dbf17543bdf1a48c49b037&query=${location}`)
    .then((response) => {
      setData({
        location: response.data.location.country + ", " + response.data.location.region + ", " + response.data.location.name,
        weather: response.data.current.weather_descriptions,
        wimage: response.data.current.weather_icons[0],
        time: response.data.current.observation_time
      })
      console.log(response.data)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
    // getWeather(geo[0].lat, geo[0].lon);
    // console.log(geo[0].lat)
      console.log(data)

  }

  return (
    <div className='container px-5 py-24 mx-auto text-5xl font-Poppins font-bold my-auto bg-gray-100 text-center'>
      Weather App
      <div className='flex flex-wrap  mt-10 place-content-center'>
             <input type="text" value={location} name="text" class="lg:w-3/5 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="ex - Mumbai" onChange={(e) => {
               setLocation(e.target.value);
               console.log(e.target.value);
             }} />
             <button type="submit" class="bg-blue-600 text-lg hover:bg-blue-700  text-white font-medium mx-5 py-2 px-10 rounded-md" onClick={handleClick}>
              Find Weather
            </button>
      </div>

      <div class="flex flex-wrap bg-blue-600 rounded-md my-auto font-normal text-lg py-10 mt-10 place-content-center text-left">
        <div class="p-4 lg:w-2/5 bg-gray-100 m-4 rounded-md ">
          <div class="font-bold text-xl tracking-normal mb-5">LOCATION</div>
          <div class="font-normal text-xl tracking-normal mb-5"> {data.location} </div>
          <div class="font-normal text-xl tracking-normal"> <b>Time</b> - {data.time} </div>
        </div>
        <div class="p-4 lg:w-2/5 bg-gray-100 m-4 rounded-md">
          <div class="font-bold text-xl mb-5 tracking-normal">WEATHER</div>
          <div class="font-normal text-xl mb-5 tracking-normal">{data.weather}</div>
          <img src={data.wimage} width="150px"/>
        </div>
      </div>
    </div>
  );
}

export default App;
