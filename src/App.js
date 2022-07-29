import './index.css'
import Sun from './assets/sun.jpg'
import Cold from './assets/cold.jpg'
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './components/weatherService';

function App() {

  const [city, setCity] = useState("Jammu")
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(Sun)

useEffect(() => {
  const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

    //DYNAMIC BG
    const threshold = units === 'metric' ? 22 : 70;
    if(data.temp <= threshold) setBg(Cold);
    else setBg(Sun);
  };
  
  fetchWeatherData(); 
}, [units, city]);

const handleUnitsClick = (e) => {
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1);
  
  const isCelsius = currentUnit === 'C';
  button.innerText = isCelsius ? "°F": "°C";
  setUnits(isCelsius ? "metric" : "imperial");
};

const enterKeyPressed = (e) => {
  if (e.keyCode === 13) {
    setCity(e.currentTarget.value)
    e.currentTarget.blur()
  }
}

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
            <div className="overlay">
            {
              weather && (
                <div className="container">
                        <div className="section section__inputs">
                            <input onKeyDown={enterKeyPressed} type="text" placeholder='Enter Your City...' />
                            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
                        </div>
                        <div className="section section__temperature">
                          <div className="icon">
                            <h3>{`${weather.name}, ${weather.country}`}</h3>
                            <img src={weather.iconURL} alt="weather icon"/>
                            <h3 style={{color:`blue`}}>{weather.description}</h3>
                          </div>
                          <div className="temperature" style={{color:`blue`}}>
                            <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C': 'F'}`}</h1>
                          </div>
                        </div>

                        {/*----BOTTOM DESCRIPTION----*/}

                        <Description weather={weather} units={units}/>
                    </div>
              )
            }
                
                </div>
            </div>  
  );
}

export default App;
