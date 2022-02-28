import React, { useState } from 'react'
//import logo from './logo.svg';
import './App.css';


/*This gets us the location key of the city that was typed */
const api = {
  key: "sGjww6q9uK6L2JVBLmLkzlJmUGBe9rF5",
  base: "https://dataservice.accuweather.com/locations/v1/cities/search",
  base2: "https://dataservice.accuweather.com/forecasts/v1/daily/1day/"
}

/*
This gets the weather data

const api = {
  key: "sGjww6q9uK6L2JVBLmLkzlJmUGBe9rF5",
  base: "http://dataservice.accuweather.com/locations/v1/cities/search"
}

http://dataservice.accuweather.com/forecasts/v1/daily/1day/{location.key}

*/

function App() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})

  /*.then(response)() {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }) */

  const search = evt => {
    if (evt.key === "Enter") {
      try {
        fetch(`${api.base}?apikey=${api.key}&q=${query}`)
          .then(res => res.json())
          .then(result => {
            //setWeather(result)
            //setQuery("")
            setCity(result[0].LocalizedName)
            console.log(weather, result[0].LocalizedName)//[0].LocalizedName)
            return fetch(`${api.base2}${result[0].Key}?apikey=${api.key}&metric=true`)
          })
          .then(res => res.json())
          .then(result => {
            console.log(result.DailyForecasts[0])
            setWeather(result.DailyForecasts[0])
            setQuery("")
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  }






  return (
    <div className="App">
      <main>
        <div className="search">
          <input type="text"
            className="search_input"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.Temperature != "undefined") ? (
          <div><p>City: {city}</p><p>Maximum Temperature: {weather.Temperature.Maximum.Value}</p></div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;

/*

  
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

*/
