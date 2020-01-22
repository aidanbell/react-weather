import React, { Component } from 'react';
import Weather from './components/Weather/Weather';
import Forecast from './components/Forecast/Forecast';

import { getCurrentLatLng } from './services/geolocation';
import { getCurWeather, getForecast } from './services/weather-api';
import { getIcon } from './services/weather-icons';

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
    const forecast = await getForecast(lat, lng, this.state.units);
    const icon = await getIcon(weatherData);
    this.setState({
      lat,
      lng,
      weatherData: weatherData,
      icon: icon,
      forecast: forecast
    })
  }

  render() {
    return (
      <div className="App">
        <h1>weather</h1>
          <Weather
            currentWeather={this.state.weatherData}
            icon={this.state.icon}
            units={this.state.units}
            />
          <Forecast
            forecast={this.state.forecast}
            units={this.state.units}
            />
      </div>
    );
  }
}

export default App;
