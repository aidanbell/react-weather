import React, { Component } from 'react';
import Weather from './Components/Weather/Weather';

import { getCurrentLatLng } from './services/geolocation';
import { getCurWeather } from './services/weather-api';
import { weatherIcons } from './services/weather-icons';

import './App.css';
import 'weather-icons/css/weather-icons.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null,
      units: 'metric'
    }
  }

  async componentDidMount() {
    const {lat, lng} = await getCurrentLatLng();
    const weatherData = await getCurWeather(lat, lng, this.state.units);
    const weatherIcon = (weatherData) => {
      let prefix = 'wi wi-';
      let code = weatherData.weather[0].id;
      let icon = weatherIcons[code].icon;

      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }

      // Finally tack on the prefix.
      icon = prefix + icon;
      return icon;
    }

    console.log(weatherData);
    this.setState({
      lat,
      lng,
      weatherData: {weatherData},
      icon: weatherIcon(weatherData)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>WEATHER APP</h1>
        <i className={this.state.icon}></i>
        <Weather/>
      </div>
    );
  }
}

export default App;
